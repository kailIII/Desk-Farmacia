<?php
class Compra extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'Compras';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'factura',
        'fecha',
        'proveedores_id',
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
                'factura' => 'required',
                'fecha' => 'required',
                'farmacia_id' => 'required',
                'proveedores_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function proveedor() 
        {
            return $this->belongsTo('Proveedor');
        }
        public function farmacia() 
        {
            return $this->belongsTo('Farmacia');
        }
        public function detallesCompra() 
        {
            return $this->hasMany('DetallesCompra', 'compras_id');
        }
}