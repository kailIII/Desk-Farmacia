<?php
class Cliente extends Eloquent {
    use SoftDeletingTrait;
    
    protected $table = 'clientes';
    public $errores;
    protected $softDelete = true;
	protected $fillable = array(
        'nombre',
        'direccion',
        'telefono',
        'email',
        'municipio_id',
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
                'email' => 'email|required|max:75|unique:clientes',
                'farmacia_id' => 'required'
            );
            
            if ($this->exists) 
            {
                $reglas['email'] .= ',email,' . $this->id;
            }
            
            $validador = Validator::make($datos,$reglas);
            
            if($validador->passes()) 
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function ventas() 
        {
            return $this->hasMany('Venta', 'cliente_id');
        }
         public function farmacia() 
        {
            return $this->belongsTo('Farmacia');
        }
}