<?php

class FVentaController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $ventas = V_Venta::where('farmacia_id', $farmacia_id)->get();
        
        return Response::json($ventas, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

}
