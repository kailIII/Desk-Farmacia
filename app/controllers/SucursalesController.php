<?php

class SucursalesController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $sucursales = V_Sucursal::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

    public function getSucursal()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $sucursal = V_Sucursal::where('id', $sucursal_id)->get();

        return Response::json($sucursal, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

    public function postGuardar()
    {
        $data = Input::all();
        $data['farmacia_id'] = "2";

        if (!Input::has('activa')) {
            $data['activa'] = 0;
        }

        if(Input::has('id'))
            $sucursal = Sucursal::find(Input::get('id'));
        else
            $sucursal = new Sucursal;
        
        if($sucursal->guardar($data))
            return Response::json($sucursal, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($sucursal->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


   public function destroy($id)
   {
        //
   }


}
