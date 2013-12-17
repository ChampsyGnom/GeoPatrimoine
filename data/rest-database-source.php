<?php
require_once('rest-abstract-source.php');

class RestDatabaseSource extends RestAbstractSource
{
   
    protected $databaseConfigurations = [];
    protected $databaseConfiguration = null;
    public function __construct($api)
    {
        parent::__construct($api);
        
    }
    function ValidateToken($array)
    {
        if (isset($array["token"]))
        {
            if (isset($_SESSION['token']))
            {
                if ($array["token"] !== $_SESSION['token'])
                { throw new Exception('Jeton invalide');}
            }
            else
            { throw new Exception('Session jeton manquant');}
        }
        else
        { throw new Exception('Paramètre jeton manquant');}
        
    }
    function Update()
    {
        $this->ValidateToken($_GET);
        $datas = [];
        $content = file_get_contents('php://input');
        $datas = get_object_vars(json_decode( $content));          
        $schemaName = $this->GetParameterString($_GET,'schemaName');
        $tableName= $this->GetParameterString($_GET,'tableName');
        $this->Connect();
        $tableColumns = $this->GetColumnInfos($schemaName,$tableName);
        $whereExpressions = [];
        $updateExpressions = [];
         for($i = 0 ;$i < count($tableColumns);$i++)
         {
            foreach ($datas as $key => $value)
            {
                if ($key === $tableColumns[$i]['name'])
                {
                    if ($tableColumns[$i]["dataType"] === 'serial')
                    {
                        $whereExpression = $this->GetWhereExpression($schemaName,$tableName,$tableColumns[$i],"=",$value);
                        array_push($whereExpressions,$whereExpression);
                    }
                    else
                    {
                        $updateExpression = $this->GetUpdateExpression($schemaName,$tableName,$tableColumns[$i],$value);
                        array_push($updateExpressions,$updateExpression);
                    }
                   
                }
            }
            
        }
        $sql = "update ".$schemaName.".".$tableName." set ".implode(",",$updateExpressions)." where ".implode(" and ",$whereExpressions);       
        $result = pg_query($this->connection, $sql);   
        
        $this->Disconnect();
        
        $datas = [];
        $datas["rows"] = [];
        $datas["total"] =0;
        return $datas;
      
    }
    function GetUpdateExpression($schemaName,$tableName,$column,$value)
    {
        if ($value === null || $value === '') return $column["name"]."="."null";
        if ($column["dataType"] === 'integer')
        {
            return $column["name"]."=".$this->ToSqlNumber($value);
        }
        else if ($column["dataType"] === 'text')
        {
            return $column["name"]."=".$this->ToSqlString($value);
        } 
        else if ($column["dataType"] === 'float')
        {
            return $column["name"]."=".$this->ToSqlNumber($value);
        }
    }
    function Delete()
    {
        $this->ValidateToken($_GET);
        $datas = [];
        $content = file_get_contents('php://input');
        $datas = get_object_vars(json_decode( $content));     
        $schemaName = $this->GetParameterString($_GET,'schemaName');
        $tableName= $this->GetParameterString($_GET,'tableName');
        $this->Connect();
        $tableColumns = $this->GetColumnInfos($schemaName,$tableName);
        $whereExpressions = [];
        for($i = 0 ;$i < count($tableColumns);$i++)
        {
            if ($tableColumns[$i]["dataType"] === 'serial')
            {
               foreach ($datas as $key => $value)
               {
                    if ($key === $tableColumns[$i]['name'])
                    {
                        $whereExpression = $this->GetWhereExpression($schemaName,$tableName,$tableColumns[$i],"=",$value);
                        array_push($whereExpressions,$whereExpression);
                    }
               }
            }
        }
        $sql = "delete from ".$schemaName.".".$tableName." where ".implode(" or ",$whereExpressions);
        $result = pg_query($this->connection, $sql);   
        $this->Disconnect();
        $datas = [];
        $datas["rows"] = [];
        $datas["total"] =0;
        return $datas;
    }
    function Insert()
    {
        $this->ValidateToken($_GET);
        $datas = [];
        $content = file_get_contents('php://input');
        $datas = get_object_vars(json_decode( $content));     
        $schemaName = $this->GetParameterString($_GET,'schemaName');
        $tableName= $this->GetParameterString($_GET,'tableName');
        $this->Connect();
        $tableColumns = $this->GetColumnInfos($schemaName,$tableName);
        $sqlInsertColumns = [];
        $sqlInsertValues = [];
        $resultDataWheres = [];
        for($i = 0 ;$i < count($tableColumns);$i++)
        {
            $resultDataIds = [];
            $value = null;
            if (isset($datas[$tableColumns[$i]["name"]]))
            {   
                $value = $datas[$tableColumns[$i]["name"]];
            }
           
            $sqlInsertValue = $this->GetInsertExpression($schemaName,$tableName,$tableColumns[$i],$value);
            if ($sqlInsertValue !== null)
            {
                array_push($sqlInsertColumns,$tableColumns[$i]["name"]);
                array_push($sqlInsertValues,$sqlInsertValue);
              
                if ($tableColumns[$i]["dataType"] === 'serial')
                {
                     
                   $resultDataWhere =  $this->GetWhereExpression($schemaName,$tableName,$tableColumns[$i],"=",$sqlInsertValue);                  
                   array_push($resultDataWheres,$resultDataWhere);
                }
            }
        }
        $sql = "insert into ".$schemaName.".".$tableName." (".implode(",",$sqlInsertColumns).") values (".implode(",",$sqlInsertValues).")";
        $result = pg_query($this->connection, $sql);   
        if ($result !== false)
        {
            $sqlSelectExpressions = [];
            for($i = 0 ;$i < count($tableColumns);$i++)
            {
                $sqlSelectExpression = $this->GetSelectExpression($schemaName,$tableName,$tableColumns[$i]);
                array_push($sqlSelectExpressions,$sqlSelectExpression);
            }
            $sql = "select ".implode(",",$sqlSelectExpressions)." from ".$schemaName.".".$tableName." where ".implode(' or ',$resultDataWheres);
            $rows = $this->FetchAllRows($sql);  
            
            $datas["rows"] = $rows["rows"];
            $datas["total"] =count($rows["rows"]);
     
        
        }
        $this->Disconnect();
       return $datas;
    }
     function GetInsertExpression($schemaName,$tableName,$column,$value)
     {
        $exp = null;
        if ($column["dataType"] === 'serial')
        {
            $sql = "select nextval('".$tableName."_".$column["name"]."_seq') as id";
            $rows = $this->FetchAllRows($sql);     
            $exp = $rows["rows"][0]["id"];
        }
        else if ($value === '' || $value === null)
        {
            return "null";
        }
        else if ($column["dataType"] === 'integer')
        {
            
            $exp =  $this->ToSqlNumber($value);
        }
        else if ($column["dataType"] === 'float')
        {
             $exp =  $this->ToSqlNumber($value);
        }
        else if ($column["dataType"] === 'text')
        {
             $exp =  $this->ToSqlString($value);
        }
        else if ($column["dataType"] === 'boolean')
        {
        
        }
         else if ($column["dataType"] === 'date')
        {
        
        }
         else if ($column["dataType"] === 'timestamp')
        {
        }
      
        return $exp;
       
     }
     function Select() 
     {
       
        $isLogin = $this->GetParameterBooleanOrDefault($_GET,'isLogin',false);	  
        $schemaName = $this->GetParameterString($_GET,'schemaName');
        $tableName= $this->GetParameterString($_GET,'tableName');
       // echo $isLogin." ".$schemaName." ".$tableName;
        $this->Connect();
        
        // On récupére la list des colonne de la table
        $tableColumns = $this->GetColumnInfos($schemaName,$tableName);
        // si une liste de colonne est spécifié on ne prend que celle la sinon on les prend toutes
        $queryColumns = $this->GetParameterStringOrDefault($_GET,'columns','');	  
        $sqlColumns = [];
        if ($queryColumns !== '')
        {
            $queryColumnsArray = explode(",",$queryColumns);
            for($i = 0 ; $i < count($queryColumnsArray) ; $i++)
            {
                for($j = 0 ; $j < count($tableColumns) ; $j++)
                {
                    if ($queryColumnsArray[i] === $tableColumns[$j]["name"])
                    {array_push($sqlColumns,$tableColumns[$j]);}
                }
            }
        }
        else
        {$sqlColumns = $tableColumns;}
        $datas = [];
        $sqlSelectExpressions = [];
        $sqlTableExpressions = [];
        $sqlWhereExpressions = [];
        $filters = [];
        if (isset($_GET['filter']))
        {
            $filterArray = json_decode($_GET['filter']);
            if (is_array($filterArray))
            {$filters = $filterArray;}
            else
            {array_push($filters,$filterArray);}
        }
        
        for($i = 0 ; $i< count($filters);$i++)
        {
            for($j = 0 ; $j < count($tableColumns) ; $j++)
            {
                $values = get_object_vars($filters[$i]);
                if ($values["property"] === $tableColumns[$j]["name"])
                {
                    $operator = "=";
                    if (isset($values["operator"]))
                    {$operator = $values["operator"];}
                    $sqlWhereExpression = $this->GetWhereExpression($schemaName,$tableName,$tableColumns[$j],$operator,$values["value"]);
                    array_push($sqlWhereExpressions,$sqlWhereExpression);
                }
            }
        }
        
        array_push($sqlTableExpressions,$schemaName.".".$tableName);
        for($i = 0 ; $i < count($sqlColumns) ; $i++)
        {array_push($sqlSelectExpressions,$this->GetSelectExpression($schemaName,$tableName,$sqlColumns[$i]));}         
        $sqlCount = "select count(*) as total from ".implode(",",$sqlTableExpressions); 
        if (count($sqlWhereExpressions) > 0)
        {$sqlCount .= " where ".implode(" and ",$sqlWhereExpressions); }
        $rows = $this->FetchAllRows($sqlCount);     
        $datas["total"] = $rows["rows"][0]["total"];
        
        
        
        
        $sql = "select ".implode(",",$sqlSelectExpressions)." from ".implode(",",$sqlTableExpressions);
        if (count($sqlWhereExpressions) > 0)
        {$sql .= " where ".implode(" and ",$sqlWhereExpressions); }       
        $rows = $this->FetchAllRows($sql);       
        if (isset($_SESSION['token']) === false ) {
            $token = md5($_SERVER["REMOTE_ADDR"].".".$_SERVER["REQUEST_TIME_FLOAT"].".".$_SERVER["SERVER_NAME"]);
            for($i = 0 ; $i < count($rows["rows"]);$i++)
            {
                $rows["rows"][$i]["token"] = $token;
                $_SESSION["token"]=  $token;
            }
        } 
        else
        {
            if ($schemaName ==='public' && $tableName==='user')
            {
                 for($i = 0 ; $i < count($rows["rows"]);$i++)
                 {
                    $rows["rows"][$i]["token"] = $_SESSION['token'];
                    
                 }
            }
            else
            {$this->ValidateToken($_GET);}
        }
        $childTableArray = null;
         if (isset($_GET["childTables"]))
        {
            $childTableArray = json_decode($_GET["childTables"]);
        }
        if ($childTableArray !== null)
        {
          $rows["rows"] = $this->RecurseLoadChildTable($schemaName,$tableName,$rows["rows"],$childTableArray);
        }
        
        
        
        $datas["rows"] = $rows["rows"];
        $this->Disconnect();
        return $datas;
        
     }
      function RecurseLoadChildTable($schemaName,$tableName,$rows , $childTablesObjects)
      {
         foreach ($rows as &$row) 
        {
            foreach ($childTablesObjects as &$childTablesObject) 
            {
                $childTable = get_object_vars($childTablesObject);
               
                if (isset($childTable["tableName"]))
                {
                    $whereJoin = $this->GetWhereJoin($schemaName,$tableName,$childTable["tableName"]);
                    $childTableColumns = $this->GetColumnInfos($schemaName,$childTable["tableName"]);
                    $childTableSelectExpressions = [];
                    $whereParent = $this->GetPrimaryKeyWhereFromValues($schemaName,$tableName,$row);
                    foreach ($childTableColumns as &$childTableColumn) 
                    {
                        $selectExpression = $this->GetSelectExpression($schemaName,$childTable["tableName"],$childTableColumn);
                        array_push($childTableSelectExpressions,$selectExpression);
                    }
                    $allWheres = [];
                    array_push($allWheres,$whereParent);
                    for($i = 0; $i<count($whereJoin["wheres"]);$i++)
                    {array_push($allWheres,$whereJoin["wheres"][$i]);}
                    $allTables = [];
                    array_push($allTables,$schemaName.".".$childTable["tableName"]);
                    array_push($allTables,$schemaName.".".$tableName);
                    for($i = 0; $i<count($whereJoin["tables"]);$i++)
                    {
                     array_push($allTables,$whereJoin["tables"][$i]);
                    }
                    $sql = "SELECT ".implode(",",$childTableSelectExpressions)." FROM ".implode(",",$allTables)." WHERE ".implode(" AND ",$allWheres);
                   
                    $result = $this->FetchAllRows($sql);
                  
                    $childRows = $result["rows"];
                   
                    if (isset($childTable["childTables"]))
                    {
                       
                        $subChildTablesObjects =  $childTable["childTables"];
                        $childRows = $this->RecurseLoadChildTable($schemaName,$childTable["tableName"],$childRows,$subChildTablesObjects);
                    }
                    if ($this->IsOneRelationShip($schemaName,$tableName,$childTable["tableName"]))
                    { $row[$childTable["tableName"]] = $childRows;}
                    else
                    { $row[$childTable["tableName"]."s"] = $childRows;}
                    
                }
            }
        }
        return $rows;
    }
    
    function IsOneRelationShip($schema,$parentTable,$childTable)
    {
            $sql = "SELECT ";
            $sql .= "tc.constraint_name, tc.table_name, kcu.column_name, ";
            $sql .= "ccu.table_name AS foreign_table_name, ";
            $sql .= "ccu.column_name AS foreign_column_name ";
            $sql .= "FROM ";
            $sql .= "information_schema.table_constraints AS tc ";
            $sql .= "JOIN information_schema.key_column_usage AS kcu ";
            $sql .= "ON tc.constraint_name = kcu.constraint_name ";
            $sql .= "JOIN information_schema.constraint_column_usage AS ccu ";
            $sql .= "ON ccu.constraint_name = tc.constraint_name ";
            $sql .= "WHERE constraint_type = 'FOREIGN KEY' ";
            $sql .= "AND tc.table_name='".$parentTable."' ";
            $sql .= "and ccu.table_name='".$childTable."'";
            $result = $this->FetchAllRows($sql);
            if (count($result["rows"]) > 0)
            {return true;}
            return false;
    }
    function GetPrimaryKeyWhereFromValues($schema,$table,$values)
    {
        $sql = "select ";
        $sql .= "a.attname as column_name ";
        $sql .= "from ";
        $sql .= "pg_class t ";
        $sql .= "join pg_attribute a on a.attrelid = t.oid ";
        $sql .= "join pg_index ix    on t.oid = ix.indrelid AND a.attnum = ANY(ix.indkey) ";
        $sql .= "join pg_class i     on i.oid = ix.indexrelid ";
        $sql .= "left join pg_attrdef d on d.adrelid = t.oid and d.adnum = a.attnum   ";
        $sql .= "where ";
        $sql .= "t.relkind = 'r' ";
        $sql .= "and t.relname in ( '".$table."' ) ";
        $sql .= "order by ";
        $sql .= "t.relname, ";
        $sql .= "i.relname, ";
        $sql .= "a.attnum; ";
        $result = $this->FetchAllRows($sql);       
        $rows = $result["rows"];
        $wheres = [];
        foreach ($rows as &$row) 
        {
            $columnName = $row["column_name"];
            if (isset($values[$columnName]))
            {
                $where = $schema.".".$table.".".$columnName."=".$values[$columnName];
                array_push($wheres,$where);
            }
        }
        return implode(" AND ",$wheres);
    }
     function IsColumnExist($schemaName,$tableName,$columnName)
    {
        $sql =  "SELECT count(*) as total FROM information_schema.columns WHERE table_schema = ".$this->ToSqlString($schemaName)." AND table_name   = ".$this->ToSqlString($tableName)." and column_name='".$columnName."'";
       
        $result = $this->FetchAllRows($sql);        
        $rows = $result["rows"];
       
        return $rows [0]["total"] >0;
    }
    function IsTableExist($schemaName,$tableName)
    {
        $sql = "select count(*) as total from pg_tables where schemaname='".$schemaName."' and tablename='".$tableName."'";
     
        $result = $this->FetchAllRows($sql);        
        $rows = $result["rows"];
       
        return $rows [0]["total"]>0;
    }
    function GetWhereJoin($schema,$parentTable,$childTable)
    {
        $infos = [];
        $sql = "SELECT ";
        $sql .= "tc.constraint_name, tc.table_name, kcu.column_name, ";
        $sql .= "ccu.table_name AS foreign_table_name, ";
        $sql .= "ccu.column_name AS foreign_column_name ";
        $sql .= "FROM ";
        $sql .= "information_schema.table_constraints AS tc ";
        $sql .= "JOIN information_schema.key_column_usage AS kcu ";
        $sql .= "ON tc.constraint_name = kcu.constraint_name ";
        $sql .= "JOIN information_schema.constraint_column_usage AS ccu ";
        $sql .= "ON ccu.constraint_name = tc.constraint_name ";
        $sql .= "WHERE constraint_type = 'FOREIGN KEY' ";
        $sql .= "AND tc.table_name='".$childTable."' ";
        $sql .= "and ccu.table_name='".$parentTable."'";
        $result = $this->FetchAllRows($sql);
        $infos["tables"] = [];
        $rows = $result["rows"];
        $wheres = [];
        foreach ($rows as &$row) 
        {
            $where = $schema.".".$parentTable.".".$row["foreign_column_name"]."=".$schema.".".$childTable.".".$row["column_name"];
            array_push($wheres,$where);
        }
        if (count($wheres) === 0)
        {
           
            if($this->IsTableExist($schema,$childTable."_".$parentTable))
            {
                
                if ($this->IsColumnExist($schema,$childTable."_".$parentTable,$childTable."__id") && 
                $this->IsColumnExist($schema,$childTable."_".$parentTable,$parentTable."__id"))
                {
                    array_push($infos["tables"],$schema.".".$childTable."_".$parentTable);
                    $where = $schema.".".$childTable.".id=".$schema.".".$childTable."_".$parentTable.".".$childTable."__id";
                    array_push($wheres,$where);
                    $where = $schema.".".$parentTable.".id=".$schema.".".$childTable."_".$parentTable.".".$parentTable."__id";
                    array_push($wheres,$where);
                   
                }
            }
            else if($this->IsTableExist($schema,$parentTable."_".$childTable))
            {
                
                if ($this->IsColumnExist($schema,$parentTable."_".$childTable,$childTable."__id") && 
                $this->IsColumnExist($schema,$parentTable."_".$childTable,$parentTable."__id"))
                { 
                    array_push($infos["tables"],$schema.".".$parentTable."_".$childTable);
                     $where = $schema.".".$childTable.".id=".$schema.".".$parentTable."_".$childTable.".".$childTable."__id";
                    array_push($wheres,$where);
                    $where = $schema.".".$parentTable.".id=".$schema.".".$parentTable."_".$childTable.".".$parentTable."__id";
                    array_push($wheres,$where);
                   
                }
            }
        }
        $infos["wheres"] = $wheres;
        
        
        return $infos;
    }
    
    
     function RecurseAddChildTables($array)
     {
       for($i = 0 ; $i < count($array);$i++)
       {
          $vars = get_object_vars($array[$i]);
          echo "table ".$vars["name"];
          $this->RecurseAddChildTables($vars["childTables"]);
       }
     }
     function GetWhereExpression($schemaName,$tableName,$column,$operator,$value)
     {
        if ($column["dataType"] === 'text')
        {
            $isMd5 = strpos($value, "md5_")  !== false;
            if ($isMd5)
            {return "lower(md5(".$schemaName.".".$tableName.".".$column["name"].")) = lower(".$this->ToSqlString(substr($value,4)).")";}
            else
            {return $schemaName.".".$tableName.".".$column["name"]." = ".$this->ToSqlString($value);}
     
        }
        if ($column["dataType"] === 'serial')
        {
            if ($operator === '=')
            {
                return $schemaName.".".$tableName.".".$column["name"]." = ".$this->ToSqlNumber($value);
            }
        }
        return null;
     }
     function GetSelectExpression($schemaName,$tableName,$column)
     {
        
          return $schemaName.".".$tableName.".".$column["name"];
     }
    function FetchAllRows($sql)
    {
        $resultInfo = [];    
       
        try 
        {
           $rows =[];
           $result = pg_query($this->connection, $sql);   
           
           while($row = pg_fetch_array($result,NULL,PGSQL_ASSOC))
           {array_push($rows,$row);}
           pg_free_result($result);
           $resultInfo["rows"] =  $rows;
           $resultInfo["success"] = true;
           return $resultInfo;
        } 
        catch (Exception $e) 
        {           
          
           throw new Exception('Erreur durant l\'éxécution de la requête '.$sql);
        }
      
    }
     function ToSqlString($value)
     {
        return "'".str_replace("'","''",$value)."'";
     }
      function ToSqlNumber($value)
     {
        return str_replace(",",".",$value);
     }
     function GetColumnInfos($schemaName,$tableName)
     {
        $sql = "SELECT column_name,ordinal_position,is_nullable,data_type,character_maximum_length,numeric_precision,numeric_scale FROM information_schema.columns WHERE table_schema = ".$this->ToSqlString($schemaName)." AND table_name   = ".$this->ToSqlString($tableName)."";
        $result = $this->FetchAllRows($sql);        
        $rows = $result["rows"];
        $columns = [];
        foreach ($rows as &$row) 
        {
            //echo $row["data_type"] ;
            //USER-DEFINED
            if ($row["data_type"] === 'USER-DEFINED')
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "geometry";             
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
            if ($row["data_type"] === 'smallint' || $row["data_type"] === 'bigint' || $row["data_type"] === 'integer' || $row["data_type"] === 'int2'  || $row["data_type"] === 'int4'  || $row["data_type"] === 'int8' )
            {
                $sql = "SELECT count(*) as nb FROM information_schema.sequences where sequence_name='".strtolower($tableName)."_".strtolower($row["column_name"])."_seq'";    
               
                $resultSeq = $this->FetchAllRows($sql);
                if ($resultSeq["success"] === false)
                {$format->OutputError($resultSeq["error"]);}
                $rowsSeq = $resultSeq["rows"];               
                if ($rowsSeq[0]["nb"] === '1')
                {
                    $column = [];
                    $column["name"] = $row["column_name"];
                    $column["dataType"] = "serial";
                    $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                    $column["allowNull"] = $row["is_nullable"] === 'YES';
                    array_push($columns,$column);
                }
                else                
                {
                    $column = [];
                    $column["name"] = $row["column_name"];
                    $column["dataType"] = "integer";
                    $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                    $column["allowNull"] = $row["is_nullable"] === 'YES';
                    array_push($columns,$column);
                }
                
              
            }
            else if ($row["data_type"] === 'numeric' || $row["data_type"] === 'decimal')
            {
                if ($row["numeric_scale"] === 0)
                {                
                    $column = [];
                    $column["name"] = $row["column_name"];
                    $column["dataType"] = "integer";
                    $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                    $column["allowNull"] = $row["is_nullable"] === 'YES';
                    array_push($columns,$column);
                }
                else                
                {
                    $column = [];
                    $column["name"] = $row["column_name"];
                    $column["dataType"] = "float";
                    $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                    $column["countDecimal"] =  $row["numeric_scale"];
                    $column["allowNull"] = $row["is_nullable"] === 'YES';
                    array_push($columns,$column);
                }
            }
            else if ($row["data_type"] === 'real' || $row["data_type"] === 'double precision' || $row["data_type"] === 'float4' || $row["data_type"] === 'float8')
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "float";
                $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                $column["countDecimal"] =  $row["numeric_scale"];
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
            else if ($row["data_type"] === 'serial' || $row["data_type"] === 'bigserial' ||$row["data_type"] === 'serial4' || $row["data_type"] === 'serial8')
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "serial";
                $column["countDigit"] =  $row["numeric_precision"] - $row["numeric_scale"];
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
            else if ($row["data_type"] === 'bool' || $row["data_type"] === 'boolean')
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "boolean";         
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
            else if ($row["data_type"] === 'date' )
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "date";         
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }           
            else if ($row["data_type"] === 'timestamp' || $row["data_type"] === 'timestamptz')
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "timestamp";         
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
            else if ($row["data_type"] === 'character varying' || $row["data_type"] === 'varchar' || $row["data_type"] === 'character' || $row["data_type"] === 'char'  || $row["data_type"] === 'text' )
            {
                $column = [];
                $column["name"] = $row["column_name"];
                $column["dataType"] = "text";         
                $column["maxLength"] = $row["character_maximum_length"];
                $column["allowNull"] = $row["is_nullable"] === 'YES';
                array_push($columns,$column);
            }
        }
        return $columns;
     }
     function Disconnect()
     {
         pg_close ($this->connection);
     }
     function Connect()
     {
        $this->databaseConfigurations = parse_ini_file("./database.ini", $process_sections = true);
        if (isset($_GET['databaseKey']) && isset($this->databaseConfigurations[$_GET['databaseKey']]))
        {$this->databaseConfiguration = $this->databaseConfigurations[$_GET['databaseKey']];}
        else
        {
          foreach ($this->databaseConfigurations as $databaseId =>  $databaseInfo)
          {
              if (filter_var($databaseInfo['default'], FILTER_VALIDATE_BOOLEAN))
              {$this->databaseConfiguration =$databaseInfo;}
           
          }         
        }
        if ($this->databaseConfiguration !== null)
        {
             $connectionString = "host=".$this->databaseConfiguration["host"]." port=".$this->databaseConfiguration["port"]." dbname=".$this->databaseConfiguration["database"]." user=".$this->databaseConfiguration["login"]." password=".$this->databaseConfiguration["password"]."";
             $this->connection = @pg_connect($connectionString);
             if ($this->connection === false)
             { throw new Exception('Impossible de se connecter '+$connectionString);}
        }
        else
        {
          
        }
     }
     
 }

?>