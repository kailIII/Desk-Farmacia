<?php
class DetallesVenta extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'detalles_ventas';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'cantidad',
        'precio',
        'producto_sucursal_id',
        'venta_id'
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
                'cantidad' => 'required',
                'precio' => 'required',
                'producto_sucursal_id' => 'required',
                'venta_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}