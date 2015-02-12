<?php
class Requisicion extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'requisiciones';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
		'fecha',
		'estado',
		'sucursal1_id',
		'sucursal2_id'
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
                'fecha' => 'required',
                'estado' => 'required',
                'sucursal1_id' => 'required|numeric',
                'sucursal2_id' => 'required|numeric'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }
}