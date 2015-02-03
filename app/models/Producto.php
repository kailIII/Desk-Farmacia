<?php
class Producto extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'productos';
	public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'nombre',
        'descripcion',
        'tipo',
        'unidad',
        'unidades',
        'subcategoria_id'
    ); 

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

    public function validar($datos) 
    {        
        $reglas = array(
            'nombre'            => 'required|max:100',
            'tipo'              => 'required|max:100',
            'unidad'            => 'required|max:100',
            'unidades'          => 'required|integer',
            'subcategoria_id'   => 'required'
        );

        $validador = Validator::make($datos,$reglas);
        
        if($validador->passes()) 
            return true;

        $this->errores = $validador->errors();
        return false;
    }

}