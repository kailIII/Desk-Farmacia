<?php

class FUserController extends BaseController {


	public function getVer()
	{
		$farmacia_id = Auth::user()->farmacia->id;

        $users = V_Usuario::where('sucursal_id', $farmacia_id)->orderBy('id','dsc')->get();


        return Response::json($users, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

    public function getSucursales()
    {
        $farmacia_id = Auth::user()->sucursal->farmacia->id;

        $sucursales = Sucursal::where('farmacia_id', $farmacia_id)->orderBy('id','dsc')->get();


        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

	public function postGuardar()
    {
        $data = Input::all();

        $pass = "123456";

        $data['password'] = Hash::make($pass);
        $data['avatar'] = "avatar_1.png";
        $data['password_confirmation'] = $pass;

        if($data['sucursal_id'] == "")
        	$data['sucursal_id'] = Auth::user()->sucursal->id;

        $usuario = new User;
        
        if($usuario->guardar($data)){

            $this->mail('emails.usuario_creado', $usuario, $pass);

            return Response::json($usuario, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        
        $errores = "";
        foreach ($usuario->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

    private function mail($template, $usuario, $pass)
    {

        Mail::send($template,array('usuario' => $usuario, 'pass' => $pass),function($message) use ($usuario) {
           
            $message->to($usuario->email, $usuario->nombre)
                    ->subject('Usuario sistema Farmacia');
        });   
        
    }

}