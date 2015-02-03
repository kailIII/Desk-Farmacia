<?php

class UserController extends BaseController {


	public function getVer()
	{
        $users = User::where('sucursal_id', Auth::user()->sucursal->id)
        				->orderBy('id','dsc')
        				->get();
        return Response::json($users, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

}