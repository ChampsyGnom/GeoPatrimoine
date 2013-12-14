<?php
session_start();
mb_internal_encoding("UTF-8");
header('Content-Type: application/json');
$lang = 'fr';
if (isset($_GET['lang']))
{$lang = $_GET['lang'];}

$jsons = [];
$langs = [];
if ($lang === 'fr')
{
	$lang = [];
	$lang["name"] = "langViewPanelHeaderTitle";
	$lang["value"] = "GéoPatrimoine";
	array_push($langs,$lang);

	$lang = [];
	$lang["name"] = "langComboLangFieldLabel";
	$lang["value"] = "Langue ";
	array_push($langs,$lang);

	
}
if ($lang === 'en')
{
	$lang = [];
	$lang["name"] = "langViewPanelHeaderTitle";
	$lang["value"] = "Gis Tech";
	array_push($langs,$lang);

	$lang = [];
	$lang["name"] = "langComboLangFieldLabel";
	$lang["value"] = "Language ";
	array_push($langs,$lang);

}



$jsons["datas"] = $langs;
$jsons["count"] = count($langs);
echo json_encode($jsons)
?>