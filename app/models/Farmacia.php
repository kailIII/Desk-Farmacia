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
                'direccion' => 'required',
                'activa' => 'required',
                'email' => 'email|required|max:100',
                'municipio_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function municipio() 
        {
            return $this->belongsTo('Municipios', 'municipios_id');
        }
        public function sucursal() 
        {
            return $this->belongsTo('Sucursal');
        }
        public function clientes() 
        {
            return $this->hasMany('Cliente', 'farmacia_id');
        }
        public function productos() 
        {
            return $this->hasMany('Producto', 'farmacia_id');
        }
        public function laboratorios() 
        {
            return $this->hasMany('Laboratorio', 'farmacia_id');
        }
        public function compras() 
        {
            return $this->hasMany('Compras', 'farmacia_id');
        }
        public function proveedores() 
        {
            return $this->hasMany('Proveedor', 'farmacia_id');
        }
        public function usuarios() 
        {
            return $this->hasMany('User', 'farmacia_id');
        }
}