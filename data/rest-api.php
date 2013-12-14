<?php
require_once 'rest-abstract-api.php';
class RestApi extends RestAbstractApi
{
    protected $User;

    public function __construct($request, $origin) {
        parent::__construct($request);

        
    }
    
     
     protected function Database() {
      
       return "toto".$this->method;
     }
     
 }

 ?>