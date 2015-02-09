<?php

class CompraController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $compras = V_Compra::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();

        return Response::json($compras, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        
        $errores = [];
        $data_compra =  $data[0];
        $data_compra['farmacia_id'] = Auth::user()->sucursal->id;
        
        $compra = new Compra;
        
        if($compra->guardar($data_compra)){
            for ( $i = 1; $i < count($data) ; $i++ ) {

                $detallecompra = new DetallesCompra;

                $detalles =  $data[$i];

                $detallecompra->cantidad            = $detalles['cantidad'];
                $detallecompra->precio              = $detalles['precio'];
                $detallecompra->compra_id            = $compra->id;
                $detallecompra->laboratorio_id      = $detalles['laboratorio_id'];
                $detallecompra->producto_farmacia_id = $detalles['producto_id'];
                
                $detallecompra->save();
            }
            $data_compra['id'] = $compra->id;
            $data_compra['detalles'] = (count($data) - 1);
            return Response::json($data_compra, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        foreach ($compra->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

   public function getDetalles($id)
   {
        $detalles = V_CompraDetalles::where('compra_id', $id)->get();

        return Response::json($detalles, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

   }


}
