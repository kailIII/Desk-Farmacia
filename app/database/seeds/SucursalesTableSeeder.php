<?php
     
use Faker\Factory as Faker;
     
class SucursalesTableSeeder extends Seeder {
     
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 5 ; $i++)
        {
            $sucursal = new Sucursal;

            $sucursal->nombre           = $faker->company;
            $sucursal->direccion        = $faker->address;
            $sucursal->telefono         = $faker->phoneNumber;
            $sucursal->email            = $faker->email;
            $sucursal->activa           = true;
            $sucursal->farmacia_id      = "2"; 
            $sucursal->municipio_id     = $faker->numberBetween(1,35); 
            $sucursal->save();
           	
        }
    }
     
}