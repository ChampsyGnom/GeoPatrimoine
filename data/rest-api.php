<?php

require_once 'rest-abstract-api.php';
class RestApi extends RestAbstractApi
{
   
    protected $source = null;
    protected $output = null;
    public function __construct($request, $origin)
    {
        parent::__construct($request);
    }
    
     protected function CreateSource()
     {
        if ($this->method === 'GET')
        {
          if (isset($_GET['source']))
          {
              if ($_GET['source'] === 'database')
              {
                  require_once('rest-database-source.php');
                  $this->source = new RestDatabaseSource($this);
                  
              }
              else
              { throw new Exception('Paramètre source '.$_GET['source'].' invalide');}
          }
          else
          {
             throw new Exception('Paramètre source manquant');
          }
        }
        else
        {
             throw new Exception('CreateSource non implémenté pour la méthode '+$this->method);
        }
     }
     
    protected function CreateOutput()
     {
        if ($this->method === 'GET')
        {
          if (isset($_GET['output']))
          {
              if ($_GET['output'] === 'json')
              {
                  require_once('rest-json-output.php');
                  $this->output = new RestJsonOutput($this);
                  
              }
              else
              { throw new Exception('Paramètre source '.$_GET['output'].' invalide');}
          }
          else
          {
             throw new Exception('Paramètre output manquant');
          }
        }
        else
        {
             throw new Exception('CreateOutput non implémenté pour la méthode '+$this->method);
        }
     }
     protected function GenericProcess() 
     {
        $this->CreateSource();
        $this->CreateOutput();
        
       $datas = null;
        if ($this->method === 'GET')
        {
          $datas = $this->source->Select();
        }
        else if  ($this->method === 'POST')
        {
           $datas = $this->source->Insert();
        }
        else if  ($this->method === 'PUT')
        {
          $datas = $this->source->Update();
        }
        else if  ($this->method === 'DELETE')
        {
            $datas = $this->source->Delete();
        }
        if ($datas !== null)
        {
           $this->output->Write($datas);
        }
        else        
        {
           throw new Exception("Objets Datas null");
        }
        
     }
     
 }

 ?>