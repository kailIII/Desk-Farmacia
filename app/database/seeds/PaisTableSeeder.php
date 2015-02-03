<?php
class PaisTableSeeder extends Seeder 
{
    public function run() 
    {
        Pais::create(array(
            "nombre" => "El Salvador"
        ));
    }
}