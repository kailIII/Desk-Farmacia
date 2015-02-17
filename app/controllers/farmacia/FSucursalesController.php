<?php

class FSucursalesController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $sucursales = V_Sucursal::whereNull('deleted_at')->where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

    public function postGuardar()
    {
        $data = Input::all();
        $data['farmacia_id'] = Auth::user()->farmacia->id;

        if (!Input::has('activa')) {$data['activa'] = 0; }

        if(Input::has('id'))
            $sucursal = Sucursal::find(Input::get('id'));
        else
            $sucursal = new Sucursal;
        
        if($sucursal->guardar($data))
            return Response::json($sucursal, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($sucursal->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postEliminar($id)
    {
        $sucursal = Sucursal::find($id);

        $sucursal->delete();
        
        return Response::json($sucursal, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


}
