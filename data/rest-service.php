<?php
require_once 'rest-api.php';
session_start();
function exception_error_handler($errno, $errstr, $errfile, $errline )
{throw new ErrorException($errstr, $errno, 0, $errfile, $errline);}
set_error_handler("exception_error_handler");
if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {  
    $RestApi = new RestApi($_SERVER["SCRIPT_NAME"], $_SERVER['HTTP_ORIGIN']);
    $RestApi->processAPI();
} catch (Exception $e) {
    $json = [];
    $json["success"] = false;
    $json["error" ] =  $e->getMessage();    
    echo json_encode($json);
}
?>