<?php

class ProveedorController extends BaseController {

	public function getVer()
	{
		$farmacia_id = Auth::user()->sucursal->farmacia->id;

		$proveedores = V_Proveedor::where('farmacia_id', $farmacia_id)->get();
		
		return Response::json($proveedores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function postGuardar()
	{
        $data = Input::all();
        $data['farmacia_id'] = Auth::user()->sucursal->farmacia->id;

        if(Input::has('id'))
            $proveedor = Proveedor::find(Input::get('id'));
        else
            $proveedor = new Proveedor;
        
        if($proveedor->guardar($data))
          	return Response::json($proveedor, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($proveedor->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

    public function postEliminar($id)
    {
        $Proveedor = Proveedor::find($id);

        $Proveedor->delete();
        
        return Response::json($Proveedor, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


}
