<?php
require_once 'rest-api.php';

if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
}

try {
    $RestApi = new RestApi($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    $RestApi->processAPI();
} catch (Exception $e) {
    echo json_encode(Array('error' => $e->getMessage()));
}
?>