<?php
class Requisicion extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'requisiciones';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'fecha',
		'sucursales_2_id',
		'sucursales_id'
		);


	/* Guardar */

        public function guardar($datos) 
        {
            if($this->validar($datos)) 
            {
                $this->fill($datos);
                $this->save();
            }

            return false;
        }


    /* Validaciones */

        public function validar($datos) 
        {        
            $reglas = array(
                'fecha' => 'required',
                'sucursales_2_id' => 'required',
                'sucursales_id' => 'required'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        //
        public function detallesRequisicion() 
        {
            return $this->hasMany('DetallesRequisicion', 'requisicion_id');
        }
         public function sucursales() 
        {
            return $this->belongsTo('Sucursal');
        }
}