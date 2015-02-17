<?php

class UserController extends BaseController {


	public function getVer()
	{

        $users = V_Usuario::whereNull('deleted_at')->where('tipo_usuario_id','<', 3)->orderBy('id','dsc')->get();


        return Response::json($users, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function postGuardar()
    {
        $data = Input::all();

        $pass = "123456";

        $data['password'] = $pass;
        $data['avatar'] = "avatar_1.png";
        $data['password_confirmation'] = $pass;

        if($data['sucursal_id'] == "")
        	$data['sucursal_id'] = "1";

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