<?php
   // header('Content-Type: application/xml');
    if (isset($_GET['url']))
    {       
      $json = [];
      // header('Content-Type: application/json');
      $url = $_GET['url']."?service=WFS&request=GetCapabilities";
      $content =  file_get_contents($url);
      
       $xml=simplexml_load_string($content);
       $layerInfos = [];
       if ($xml->WFS_Capabilities !== null)
       {
            $json["version"] = ((string) $xml["version"]);
               
             foreach ( $xml->FeatureTypeList->FeatureType as $featureType) 
             {                 
                 
                
                    
                   
                    $layerInfo = [];
                    $layerInfo["name"] = (string) $featureType->Name;
                    $layerInfo["display_name"] = (string) $featureType->Title;
                    $crs = (string) $featureType->DefaultCRS;
                    if ($crs !== null && $crs !== '')
                    {$layerInfo["epsg"]  =str_replace('urn:ogc:def:crs:EPSG::','',$crs);}
                    $formats = [];
                    if ($featureType->OutputFormats !== null)
                    {
                       
                        if ($featureType->OutputFormats->Format !== null)
                        {
                            foreach ( $featureType->OutputFormats->Format as $featureformat) 
                            {
                                $pos = strpos(((string) $featureformat), "gml");
                                if ($pos !== false) 
                                {array_push($formats,"gml");}
                        
                                $pos = strpos(((string) $featureformat), "geojson");
                                if ($pos !== false) 
                                {array_push($formats,"geojson");}
                        
                                $pos = strpos(((string) $featureformat), "kml");
                                if ($pos !== false) 
                                {array_push($formats,"kml");}
                       
                            }
                        }
                        
                    }
                    
                    $layerInfo["formats"] = $formats;
                    array_push($layerInfos,$layerInfo);
                    
                 
             }
       }
   
        for($i = 0 ; $i < count($layerInfos);$i++)
        {
            $columns = [];
            $urlDescribe = "http://localhost:8081/geoserver/ows?service=WFS&request=DescribeFeatureType&version=2.0.0&typeName=".$layerInfos[$i]["name"];
            $contentDescribe =  file_get_contents($urlDescribe);
            $contentDescribe =  str_replace("xsd:","",$contentDescribe);
            $xml=simplexml_load_string($contentDescribe);
            foreach ($xml->complexType  as $complexType) 
            {
                $complexTypeName = (string) $complexType['name'];
                foreach ($complexType->complexContent->extension->sequence->element  as $element) 
                {
                    $column = [];
                    $column["name"] = (string)$element['name'];
                    $column["display_name"] =(string)$element['name'];
                    $column["data_type"] =(string)$element['type'];
                    $column["allow_null"] =(string)$element['nillable'];
                    array_push($columns,$column);
                }
                
            }
            $layerInfos[$i]["columns"] = $columns;
        }
       $json["url"] = $url;       
       $json["datas"] = $layerInfos;
       $json["total"] = count($layerInfos);
       $json["success"] = true;
      echo json_encode($json);
    
    }
?>