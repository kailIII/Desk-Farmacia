<?php

class FFarmaciaController extends BaseController {


    public function getFarmacia()
	{
        $farmacia_id = Auth::user()->farmacia->id;

        $farmacia = V_Farmacia::where('id', $farmacia_id)->get();

       	return Response::json($farmacia, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function postGuardar()
	{
        $data = Input::all();

	    $farmacia = Farmacia::find(Auth::user()->farmacia->id);

        if($farmacia->guardar($data))
          	return Response::json($farmacia, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($farmacia->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}


}
