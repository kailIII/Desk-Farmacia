<?php
class Proveedor extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'proveedores';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'nombre',
        'direccion',
		'telefono',
        'email',
        'contacto',
		'tel_contacto',
        'email_contacto',
        'municipio_id',
        'farmacia_id'
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
                'nombre' => 'required|max:100',
                'direccion' => 'required|max:300',
                'email' => 'email|required|max:100|unique:proveedores',
                'contacto' => 'required|max:100',
                'email_contacto' => 'email|required|max:100|unique:proveedores',
                'municipio_id' => 'required',
                'farmacia_id' => 'required'
            );

            if ($this->exists) 
            {
                $reglas['email'] .= ',email,' . $this->id;
            }
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}