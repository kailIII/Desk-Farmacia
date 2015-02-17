<?php

class SSucursalesController extends BaseController {

	public function getSucursal()
    {
        $sucursal_id = Auth::user()->sucursal->id;

        $sucursal = V_Sucursal::where('id', $sucursal_id)->get();

        return Response::json($sucursal, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

}

