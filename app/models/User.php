<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	protected $table = 'users';
	protected $hidden = array('password', 'remember_token');
    protected $fillable = array(
        'user',
        'email',
        'password',
        'avatar',
        'sucursal_id',
        'tipo_usuario_id'
    );

    public function guardar($datos) 
        {
            if($this->validar($datos)) 
            {
                $datos['password'] = Hash::make($datos['password']);
                $this->fill($datos);
                $this->save();
               
                $id = $this->id;

                return true;
            }
            
            return false;
        }

    /* Validación de Campos */

        public function validar($datos) 
        {
            $reglas = array(
                'user' => 'required|max:100',
                'email' => 'email|required|max:100|unique:users',
                'avatar' => 'required|max:100',
                'password' => 'required|min:6|confirmed',
                'tipo_usuario_id' => 'required'
            );        
            
            if ($this->exists)

                $reglas['email'] .= ',email,' . $this->id;
        
            else 
                $reglas['password'] .= '|required';
            
            $validador = Validator::make($datos, $reglas);
            
            if ($validador->passes()) 
                return true;
            
            $this->errores = $validador->errors();
            return false;
        }

	public function sucursal() 
    {
        return $this->belongsTo('Sucursal', 'sucursal_id');
    }

    public function farmacia() 
    {
        return $this->belongsTo('Farmacia', 'sucursal_id');
    }

    public function tipo() 
    {
        return $this->belongsTo('TipoUsuario', 'tipo_usuario_id');
    }

}
