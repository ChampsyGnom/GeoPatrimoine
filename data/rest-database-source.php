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
    
     
     function Select() 
     {
        $isLogin = false;
		    if (isset($_GET['isLogin']))
        {$isLogin = filter_var($_GET['isLogin'], FILTER_VALIDATE_BOOLEAN);}
        if ($isLogin)
        {return $this->Login();}
        return "non implémenté";     
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
             $this->connection = pg_connect($connectionString);
        }
        else
        {
          
        }
     }
     function Login()
     {
        $this->Connect();
        $sql = "select ";
     }
 }

?>