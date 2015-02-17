<?php
class ProductosFarmacia extends Eloquent {
    use SoftDeletingTrait;

    protected $table = 'productos_farmacias';
    public $errores;
    protected $softDelete = true;
    protected $fillable = array(
        'cantidad',
        'minimo',
        'precio',
        'producto_id',
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
                'cantidad' => 'required',
                'minimo' => 'required',
                'precio' => 'required',
                'producto_id' => 'required',
                'farmacia_id' => 'required'
            );

            $validador = Validator::make($datos,$reglas);

            if($validador->passes())
                return true;

            $this->errores = $validador->errors();
            return false;
        }

}
