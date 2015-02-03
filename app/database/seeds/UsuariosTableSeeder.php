<?php
class UsuariosTableSeeder extends Seeder 
{
    public function run() 
    {
        // Admon General
        User::create(array(
            'sucursal_id'       => '1',
            'user'              => 'Jesus Alvarado',
            'email'             => 'admon@admon.com',
            'password'          => Hash::make('admon'),
            'avatar'            => 'avatar_5.png',
            'tipo_usuario_id'  => '1',
        ));

        // Admon Farmacia
        User::create(array(
            'sucursal_id'       => '2',
            'user'              => 'Jesus Alvarado',
            'email'             => 'farmacia@farmacia.com',
            'password'          => Hash::make('farmacia'),
            'avatar'            => 'avatar_3.png',
            'tipo_usuario_id'   => '2',
        ));

        // Admon Sucursal
        User::create(array(
            'sucursal_id'       => '2',
            'user'              => 'Jesus Alvarado',
            'email'             => 'sucursal@sucursal.com',
            'password'          => Hash::make('sucursal'),
            'avatar'            => 'avatar_1.png',
            'tipo_usuario_id'   => '3',
        ));

        // Vendedor
        User::create(array(
            'sucursal_id'       => '2',
            'user'              => 'Jesus Alvarado',
            'email'             => 'vendedor@vendedor.com',
            'password'          => Hash::make('vendedor'),
            'avatar'            => 'avatar_4.png',
            'tipo_usuario_id'   => '4',
        ));
    }
}