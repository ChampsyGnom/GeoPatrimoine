<?php
abstract class RestAbstractSource
{
    protected $api =null;

    public function __construct($api)
    {
       $this->api = $api;
    }

	
    public function GetParameterString($array,$key)
    {
      if (isset($array[$key]))
      {return $array[$key];}
      else throw new Exception('Paramètre '.$key.' manquant');
    }
   public function  GetParameterStringOrDefault($array,$key,$defaultValue)
   {
    if (isset($array[$key]))
      {return $array[$key];}
      else return $defaultValue;
   }
    public function GetParameterBooleanOrDefault($array,$key,$defaultValue)
    {
      if (isset($array[$key]))
      {return filter_var($array[$key], FILTER_VALIDATE_BOOLEAN);}
      else return $defaultValue;
    }
}
?>