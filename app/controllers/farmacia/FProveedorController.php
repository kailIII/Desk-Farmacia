<?php

class FProveedorController extends BaseController {

	public function getVer()
	{
		$farmacia_id = Auth::user()->farmacia->id;

		$proveedores = V_Proveedor::whereNull('deleted_at')->where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();
		
		return Response::json($proveedores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function postGuardar()
	{
        $data = Input::all();
        $data['farmacia_id'] = Auth::user()->farmacia->id;

        if(Input::has('id'))
            $proveedor = Proveedor::find(Input::get('id'));
        else
            $proveedor = new Proveedor;
        
        if($proveedor->guardar($data))
          	return Response::json($proveedor, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($proveedor->errores->all() as $error) {
            $errores .= "<br>" . $error;
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
