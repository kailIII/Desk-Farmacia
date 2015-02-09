<?php
 
use Faker\Factory as Faker;
 
class ProveedoresTableSeeder extends Seeder {
 
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 5 ; $i++)
        {
            $proveedor = new Proveedor;

            $proveedor->nombre     = $faker->company;
            $proveedor->direccion     = $faker->address;
            $proveedor->telefono     = $faker->phoneNumber;
            $proveedor->email         = $faker->email;
            $proveedor->contacto        = $faker->name;
            $proveedor->tel_contacto  = $faker->phoneNumber;
            $proveedor->email_contacto     = $faker->email;
            $proveedor->municipio_id   = $faker->numberBetween(1,100); 
            $proveedor->farmacia_id   = "2"; 
            $proveedor->save();
           
        }
    }
 
}