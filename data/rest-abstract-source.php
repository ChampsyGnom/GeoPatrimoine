<?php
abstract class RestAbstractSource
{
    protected $api =null;

    public function __construct($api)
    {
       $this->api = $api;
    }

	
}
?>