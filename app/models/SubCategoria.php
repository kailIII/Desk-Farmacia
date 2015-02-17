<?php
class SubCategoria extends Eloquent {
     use SoftDeletingTrait;
    
    protected $table = 'subcategorias';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'nombre',
        'categoria_id'
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
                'categoria_id' => 'required'
            );
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}