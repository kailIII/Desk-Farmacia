<?php

class SProductoController extends BaseController {

    public function getVer()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $productos = V_ProductosSucursal::where('sucursal_id', $sucursal_id)->orderBy('id','dsc')->get();


        return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();

        $p = [];
        $p['producto_farmacia_id'] = $data['id'];
        $p['cantidad'] = 0;
        $p['minimo'] = 1;
        $p['ubicacion'] = "";
        $p['sucursal_id'] = Auth::user()->sucursal->id;

        $producto = new ProductosSucursal;

        if($producto->guardar($p))
            return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($producto->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }
}
