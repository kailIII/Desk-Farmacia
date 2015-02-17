<?php

class FRequisicionController extends BaseController {

    public function getVer()
    {

        $farmacia_id = Auth::user()->farmacia->id;

        $requisiciones = V_Requisicion::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getDetalles($id)
    {
        $detalles = V_RequisicionDetalles::where('requisicion_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

}
