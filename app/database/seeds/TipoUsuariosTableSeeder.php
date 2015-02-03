<?php

class TipoUsuariosTableSeeder extends Seeder 
{
    public function run() 
    {
        $tipos = ["Administrador General",
                  "Administrador Farmacia",
                  "Administrador Sucursal",
                  "Vendedor"
                 ];
        
        for($f=0; $f<count($tipos); $f++) {
            TipoUsuario::create(array(
                "definicion" => $tipos[$f]
            ));    
        }
    }
}