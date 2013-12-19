<?php
 //   header('Content-Type: application/xml');
    if (isset($_GET['url']))
    {       
       header("Access-Control-Allow-Orgin: *");
       header("Access-Control-Allow-Methods: *");
       header('Content-Type: application/json');
       $content =  file_get_contents($_GET['url']."?service=WMS&request=GetCapabilities");      
       //echo $content;
       $xml=simplexml_load_string($content);
       $layerInfos = [];
       if ($xml->WMT_MS_Capabilities !== null)
       {
             
             foreach ( $xml->Capability->Layer as $serverLayer) 
             {                 
                 
                 foreach ( $serverLayer->Layer as $layer) 
                 {
                  
                    $layerInfo = [];
                    $layerInfo["name"] = (string) $layer->Name;
                    $layerInfo["display_name"] = (string) $layer->Title;
                    $layerInfo["epsg"]  = str_replace("EPSG:","" , ((string) $layer->CRS));
                    array_push($layerInfos,$layerInfo);
                 }
             }
       }
       $json = [];
       $json["datas"] = $layerInfos;
       $json["total"] = count($layerInfos);
       $json["success"] = true;
       echo json_encode($json);
    }
?>