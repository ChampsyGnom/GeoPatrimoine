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
        $json = [];
        $json["success"] = true;
        $json["total"] = $datas["total"];
        $json["datas"] = $datas["rows"];
        echo json_encode($json);
    }
     
 }

?>