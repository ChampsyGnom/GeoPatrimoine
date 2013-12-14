<?php
require_once('rest-abstract-source.php');

class RestDatabaseSource extends RestAbstractSource
{
   

    public function __construct($api)
    {
        parent::__construct($api);
    }
    
     
     function Select() 
     {
        return "oki";     
     }
     
 }

?>