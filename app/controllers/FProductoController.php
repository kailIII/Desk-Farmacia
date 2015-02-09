<?php

class FProductoController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $productos = V_ProductosFarmacia::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();

        $p = [];
        $p['producto_id'] = $data['id'];
        $p['cantidad'] = 0;
        $p['minimo'] = 1;
        $p['farmacia_id'] = Auth::user()->farmacia->id;

        $producto = new ProductosFarmacia;

        if($producto->guardar($p))
            return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($producto->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }
}
