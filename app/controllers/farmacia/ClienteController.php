<?php

class ClienteController extends BaseController {

	public function getVer()
	{
        try {
            $farmacia_id = Auth::user()->farmacia->id;
        } catch (Exception $e) {
            $farmacia_id = Auth::user()->sucursal->farmacia->id;
        }

        $clientes = V_Cliente::whereNull('deleted_at')->where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();
       
        return Response::json($clientes, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}


	public function postGuardar()
	{
        $data = Input::all();
        $data['farmacia_id'] = Auth::user()->farmacia->id;

        if(Input::has('id'))
            $cliente = Cliente::find(Input::get('id'));
        else
            $cliente = new Cliente;
        
        if($cliente->guardar($data))
          	return Response::json($cliente, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($cliente->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

    public function postEliminar($id)
    {
        $cliente = Cliente::find($id);

        $cliente->delete();
        
        return Response::json($cliente, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

}