<?php
require_once('rest-abstract-source.php');

class RestDatabaseSource extends RestAbstractSource
{
   

    public function __construct($api)
    {
        parent::__construct($api);
        $ini_array = parse_ini_file("./database.ini", $process_sections = true);
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
     
     function Login()
     {
        return  "oki";
     }
 }

?>