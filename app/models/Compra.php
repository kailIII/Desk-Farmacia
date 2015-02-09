<?php
class Compra extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'Compras';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'fecha',
        'factura',
        'lote',
        'vencimiento',
        'proveedor_id',
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
                'fecha' => 'required',
                'factura' => 'required',
                'lote' => 'required',
                'vencimiento' => 'required',
                'proveedor_id' => 'required',
                'farmacia_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }
        
}