<?php
session_start();
mb_internal_encoding("UTF-8");
header('Content-Type: application/json');
$lang = 'fr';
if (isset($_GET['lang']))
{$lang = $_GET['lang'];}

$headers = null;
$nbHeader = 0;
$nbLang = 0;
$langs = [];
$ini_array = parse_ini_file("../resources/lang.ini", $process_sections = true);



$json = [];
$datas = [];

$langData = $ini_array[$lang];
$dataCount = count($langData);

foreach ($langData as $key => $value)
{
  $data = [];
  $data["name"] = $key;
  $data["value"] = $value;
  array_push($datas,$data);
}
    
    

$json["datas"] = $datas;
$json["count"] = count($datas);
$json["success"] =true;
echo json_encode($json);

die();
?>