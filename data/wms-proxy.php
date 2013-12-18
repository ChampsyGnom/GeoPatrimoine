<?php
 //   header('Content-Type: application/xml');
    if (isset($_GET['url']))
    {       
      
       header('Content-Type: application/json');
       $content =  file_get_contents($_GET['url']."?version=1.1.1&service=WMS&request=GetCapabilities");
       $xml=simplexml_load_string($content);
       $layerInfos = [];
       if ($xml->WMT_MS_Capabilities !== null)
       {
             
             foreach ( $xml->Capability->Layer as $serverLayer) 
             {                 
                 $srs = [];
                 foreach ( $serverLayer->SRS as $sr) 
                 {array_push($srs,(string) $sr);}
                 foreach ( $serverLayer->Layer as $layer) 
                 {
                    $layerInfo = [];
                    $layerInfo["Name"] = (string) $layer->Name;
                    $layerInfo["Title"] = (string) $layer->Title;
                    $layerInfo["SRS"] =str_replace("EPSG:","", ( (string) $layer->SRS));
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