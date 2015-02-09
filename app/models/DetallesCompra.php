<?php
class DetallesCompra extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'detalles_compras';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'cantidad',
        'precio',
        'compra_id',
        'laboratorio_id',
        'producto_farmacia_id'
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
                'compras_id' => 'required',
                'laboratorio_id' => 'required',
                'producto_farmacia_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function compra() 
        {
            return $this->belongsTo('Compra');
        }
        public function laboratorio() 
        {
            return $this->belongsTo('Laboratorio');
        }
        public function productos() 
        {
            return $this->belongsTo('Productos');
        }
}