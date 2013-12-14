<?php
require_once('rest-abstract-output.php');

class RestJsonOutput extends RestAbstractOutput
{
   

    public function __construct($api)
    {
        parent::__construct($api);
        header('Content-Type: application/json');
    }
    
     
    function Write($datas)
    {
        echo json_encode($datas);
    }
     
 }

?>