<?php
class ProductosSucursal extends Eloquent {
    use SoftDeletingTrait;

    protected $table = 'productos_sucursales';
    public $errores;
    protected $softDelete = true;
    protected $fillable = array(
        'precio',
        'cantidad',
        'minimo',
        'ubicacion',
        'sucursal_id',
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
                'precio' => 'required',
                'cantidad' => 'required',
                'minimo' => 'required',
                'ubicacion' => 'required|max:300',
                'sucursal_id' => 'required',
                'producto_farmacia_id' => 'required'
            );

            $validador = Validator::make($datos,$reglas);

            if($validador->passes())
                return true;

            $this->errores = $validador->errors();
            return false;
        }


    /* Relaciones */

        public function productoFarmacia()
        {
            return $this->belongsTo('ProductoFarmacia');
        }
        public function sucursal()
        {
            return $this->belongsTo('Sucursal');
        }
}
