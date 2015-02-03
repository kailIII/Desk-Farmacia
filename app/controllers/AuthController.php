<?php

class AuthController extends BaseController {


	//Mostrar Login
    public function get_login()
    {
        if(Auth::check())
            return Redirect::to('/');
        else
            return View::make('login');
    }


    //Log In
    public function post_login()
    {
        $datos = Input::only('email', 'password');

        if(Auth::attempt($datos, Input::get('remember-me')))
            return Redirect::to('/'); 
        else
            return Redirect::to('login');
    }

    //Log Out
    public function get_logOut()
    {
        Auth::logout();
        return Redirect::to('/');
    }

}
