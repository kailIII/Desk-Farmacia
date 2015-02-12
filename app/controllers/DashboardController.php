<?php

class DashboardController extends BaseController{


	public function admin()
	{
        $datos = V_DashboardAdmin::all();

        return Response::json($datos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

	public function sucursal()
	{
        $datos = V_DashboardSucursal::all();

        return Response::json($datos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

	public function farmacia()
	{
        $datos = V_DashboardFarmacia::all();

        return Response::json($datos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}


}