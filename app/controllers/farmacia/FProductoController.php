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

        $data['producto_id'] = $data['id'];
        $data['cantidad'] = 0;
        $data['minimo'] = 1;
        $data['precio'] = 0;
        $data['farmacia_id'] = Auth::user()->farmacia->id;

        $producto = new ProductosFarmacia;

        if($producto->guardar($data))
            return Response::json($data, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        
        
        $errores = "";
        foreach ($producto->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }
}
