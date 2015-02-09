<?php
class Venta extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'ventas';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'fecha',
        'factura',
        'tipo_factura_id',
		'cliente_id',
        'sucursal_id'
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
                'fecha'             => 'required|date',
                'factura'           => 'required',
                'tipo_factura_id'   => 'required|numeric',
                'cliente_id'        => 'required|numeric',
                'sucursal_id'       => 'required|numeric'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        //
         public function sucursal() 
        {
            return $this->belongsTo('Sucursal');
        }
        public function cliente() 
        {
            return $this->belongsTo('Cliente');
        }
        public function detallesVenta() 
        {
            return $this->belongsTo('DetallesVenta');
        }
}