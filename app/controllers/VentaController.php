<?php

class VentaController extends BaseController {

    public function getVer()
    {
        $sucursal = Auth::user()->sucursal->id;

        $ventas = Venta::where('sucursal_id', $sucursal)->get();
        
        return Response::json($ventas, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $errores = [];
        $data_venta =  $data[0];

        $data_venta['sucursal_id'] = Auth::user()->sucursal->id;

        $venta = new Venta;
        
        if($venta->guardar($data_venta)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detalleventa = new DetallesVenta;

                $detalles =  $data[$i];

                $detalleventa->cantidad         = $detalles['cantidad'];
                $detalleventa->precio           = $detalles['precio'];
                $detalleventa->venta_id         = $venta->id;
                $detalleventa->producto_sucursal_id = $detalles['producto_id'];
                
                $detalleventa->save();
                $errores[] = array('type' => 'danger', 'msg' => 'agregado');
            }
            
            return Response::json($venta, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        foreach ($venta->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

   public function destroy($id)
   {
        //
   }


}
