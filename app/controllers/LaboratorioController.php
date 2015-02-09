<?php

class LaboratorioController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->farmacia->id;

        $laboratorios = Laboratorio::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();
        
        return Response::json($laboratorios, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();
        $data['farmacia_id'] = Auth::user()->farmacia->id;

        if(Input::has('id'))
            $laboratorio = Laboratorio::find(Input::get('id'));
        else
            $laboratorio = new Laboratorio;
        
        if($laboratorio->guardar($data))
            return Response::json($laboratorio, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        foreach ($laboratorio->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

   public function destroy($id)
   {
        //
   }


}
