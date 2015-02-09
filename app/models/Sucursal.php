<?php
class Sucursal extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'sucursales';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'nombre',
		'direccion',
		'telefono',
		'email',
        'activa',
		'farmacia_id',
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
                'nombre' => 'required|max:100',
                'email' => 'email|max:100',
                'farmacia_id' => 'required'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

    public function farmacia() 
    {
        return $this->belongsTo('Farmacia', 'farmacia_id');
    }

}