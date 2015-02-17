<?php
class Farmacia extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'farmacias';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'activa', 
		'direccion', 
		'email', 
		'nombre', 
		'telefono', 
		'web',
		'municipio_id'
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
                'nombre' => 'required',
                'email' => 'required|email'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}