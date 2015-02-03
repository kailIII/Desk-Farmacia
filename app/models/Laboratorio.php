<?php
class Laboratorio extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'laboratorios';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'nombre',
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
                'nombre' => 'required|max:100',
                'farmacia_id' => 'required'
            );

            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        //
        public function detallesCompra() 
        {
            return $this->hasMany('DetallesCompra', 'laboratorios_id');
        }
         public function farmacia() 
        {
            return $this->belongsTo('Farmacia');
        }
}