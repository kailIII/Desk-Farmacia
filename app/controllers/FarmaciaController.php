<?php

class FarmaciaController extends BaseController {

	public function getVer()
    {

        $farmacias = V_Farmacia::orderBy('id','dsc')->get();


        return Response::json($farmacias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

    public function getFarmacia()
	{
        $farmacia_id = Auth::user()->farmacia->id;

        $farmacia = V_Farmacia::where('id', $farmacia_id)->get();

       	return Response::json($farmacia, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}


	public function postGuardar()
	{
        $data = Input::all();

        if (!Input::has('activa')) {
            $data['activa'] = 0;
        }

        if(Input::has('id'))
	        $farmacia = Farmacia::find(Input::get('id'));
	    else
	    	$farmacia = new Farmacia;

        if($farmacia->guardar($data))
          	return Response::json($farmacia, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($farmacia->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}


	public function destroy($id)
	{
        $farmacia = Farmacia::find($id);
		$farmacia->delete();
        return Response::json($farmacia,202);
	}


}
