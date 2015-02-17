<?php

class ProductoController extends BaseController {

// Carga productos
    public function getVer()
    {

        $productos = V_Producto::whereNull('deleted_at')->orderBy('id','dsc')->get();

        return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


// Guardar modificar
    public function postGuardar()
    {
        $data = Input::all();

        if(Input::has('id'))
             $producto = Producto::find(Input::get('id'));
        else
             $producto = new Producto;
        
        if($producto->guardar($data))
            return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($producto->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

// Eliminar
    public function postEliminar($id)
    {
        $producto = Producto::find($id);

        $producto->delete();
        
        return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }
}
