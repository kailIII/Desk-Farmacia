<?php
class Categoria extends Eloquent {
     use SoftDeletingTrait;
    
    protected $table = 'categorias';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'nombre'
    ); 


	/* Guardar */
        public function guardar($datos) 
        {
            if($this->validar($datos)) 
            {
                $this->fill($datos);
                $this->save();
                return true;
            }

            return false;
        }


    /* Validaciones */
        public function validar($datos) 
        {        
            $reglas = array(
                'nombre' => 'required|max:100'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}