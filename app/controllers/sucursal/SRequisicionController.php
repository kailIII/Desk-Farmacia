<?php

class SRequisicionController extends BaseController {

    public function getVer()
    {

        $sucursal_id = Auth::user()->sucursal->id;

        $requisiciones = V_Requisicion::where('sucursal1_id', $sucursal_id)->orderBy('id','dsc')->get();

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getEstado($estado)
    {

        $sucursal_id = Auth::user()->sucursal->id;

        $requisiciones = V_Requisicion::where('sucursal1_id','!=', $sucursal_id)->
        								where('estado', $estado)->orderBy('id','dsc')->get();

        return Response::json($requisiciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $data_requisicion =  $data[0];

        $data_requisicion['sucursal1_id'] = Auth::user()->sucursal->id;

        $requisicion = new Requisicion;
        
        if($requisicion->guardar($data_requisicion)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detallerequisicion = new DetallesRequisicion;

                $detalles =  $data[$i];

                $detallerequisicion->cantidad         	= $detalles['cantidad'];
                $detallerequisicion->requisicion_id     = $requisicion->id;
                $detallerequisicion->producto_sucursal_id = $detalles['producto_id'];
                
                $detallerequisicion->save();
            }
            
            return Response::json($requisicion, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        $errores = [];
        foreach ($requisicion->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function getDetalles($id)
    {
        $detalles = V_RequisicionDetalles::where('requisicion_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getSucursales()
    {
        $farmacia_id = Auth::user()->sucursal->farmacia->id;

        $sucursales = Sucursal::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

}
