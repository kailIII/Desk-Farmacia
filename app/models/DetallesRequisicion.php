<?php
class DetallesRequisicion extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'detalles_requisiciones';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'cantidad',
        'requisicion_id',
        'producto_sucursal_id'
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
                'requisicion_id' => 'required',
                'cantidad' => 'required',
                'producto_sucursal_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function requisicion() 
        {
            return $this->belongsTo('Compra');
        }
        public function producto() 
        {
            return $this->belongsTo('Productos');
        }
}