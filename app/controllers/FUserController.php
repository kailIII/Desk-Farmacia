<?php

class FUserController extends BaseController {


	public function getVer()
	{
		$tipo = Auth::user()->tipo->id;

        $users = User::where('tipo_usuario_id', $tipo)
        				->orderBy('id','dsc')
        				->get();


        return Response::json($users, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

    public function getSucursales()
    {
        $farmacia = Auth::user()->farmacia->id;

        $sucursales = Sucursal::where('farmacia_id', $farmacia)
                        ->orderBy('id','dsc')
                        ->get();


        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }

	public function postGuardar()
    {
        $data = Input::all();

        $pass = "123456";

        $data['password'] = $pass;
        $data['avatar'] = "avatar_1.png";
        $data['password_confirmation'] = $pass;

        if($data['sucursal_id'] == 0)
        	$data['sucursal_id'] = Auth::user()->farmacia->id;

        $usuario = new User;
        
        if($usuario->guardar($data)){

            $this->mail('emails.usuario_creado', $usuario, $pass);

            return Response::json($usuario, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        
        $errores = [];
        foreach ($usuario->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
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