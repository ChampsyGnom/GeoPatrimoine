<?php
abstract class RestAbstractOutput
{
    protected $api =null;

    public function __construct($api)
    {
       $this->api = $api;
    }

	
}
?>