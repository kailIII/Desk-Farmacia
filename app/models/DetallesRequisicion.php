<?php
class DetallesRequisicion extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'detallesrequisicion';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'cantidad',
        'productos_id',
        'requesicion_id'
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
                'requesicion_id' => 'required',
                'productos_id' => 'required'
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