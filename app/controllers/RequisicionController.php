<?php

class RequisicionController extends BaseController {

    public function getVer()
    {
        $requisiciones = Requisicion::all();
        

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        $data['subcategoria_id'] = "1";

        if(Input::has('id'))
             $producto = Producto::find(Input::get('id'));
        else
             $producto = new Producto;
        
        if($producto->guardar($data))
            return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($producto->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

   public function destroy($id)
   {
        //
   }


}
