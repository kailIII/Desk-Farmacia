<?php
class ProductosFarmacia extends Eloquent {
    use SoftDeletingTrait;

    protected $table = 'productos_farmacias';
    public $errores;
    protected $softDelete = true;
    protected $fillable = array(
        'productos_id',
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
                'productos_id' => 'required',
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
            return $this->hasMany('DetallesCompra', 'productos_farmacia_id');
        }
        public function detallesVenta()
        {
            return $this->hasMany('DetallesVenta', 'productos_farmacia_id');
        }
        public function sucursal()
        {
            return $this->hasMany('ProductoSucursal', 'productos_farmacia_id');
        }
        public function farmacia()
        {
            return $this->belongsTo('Farmacia');
        }
        public function producto()
        {
            return $this->belongsTo('Producto');
        }
}
