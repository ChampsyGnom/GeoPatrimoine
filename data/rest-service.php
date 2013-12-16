<?php
require_once 'rest-api.php';

if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {
    $RestApi = new RestApi($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    $RestApi->processAPI();
} catch (Exception $e) {
    $json = [];
    $json["success"] = false;
    $json["error" ] =  $e->getMessage();    
    echo json_encode($json);
}
?>