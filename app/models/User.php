<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $table = 'users';
	protected $hidden = array('password', 'remember_token');

	public function sucursal() 
    {
        return $this->belongsTo('Sucursal', 'sucursal_id');
    }

    public function tipo() 
    {
        return $this->belongsTo('TipoUsuario', 'tipo_usuario_id');
    }

}
