<?php

class VentaController extends BaseController {

    public function getVer()
    {
        $sucursal = Auth::user()->sucursal->id;

        $ventas = V_Venta::where('sucursal_id', $sucursal)->get();
        
        return Response::json($ventas, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $errores = [];
        $data_venta =  $data[0];
        $data_venta['sucursal_id'] = Auth::user()->sucursal->id;

        $venta = new Venta;

        // Guardar Venta
        if($venta->guardar($data_venta)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detalleventa = new DetallesVenta;

                $detalles =  $data[$i];
                $detalles['venta_id'] = $venta->id;


                // Guardar Detalle
                if($detalleventa->guardar($detalles)){
                	// Disminuir Inventario
                	$this->inventario($detalleventa->producto_sucursal_id,$detalleventa->cantidad);
                }

            }
            
            $data_venta['id'] = $venta->id;
            $data_venta['detalles'] = (count($data) - 1);
            return Response::json($data_venta, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        foreach ($venta->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    public function getDetalles($id)
    {
        $detalles = V_VentaDetalles::where('venta_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }



    public function inventario($id, $c)
    {
    	$producto = ProductosSucursal::find($id);
    	$producto->cantidad = ($producto->cantidad - $c);
    	$producto->save();
    }

}
