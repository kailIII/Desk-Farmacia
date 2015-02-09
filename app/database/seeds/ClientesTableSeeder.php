<?php
 
use Faker\Factory as Faker;
 
class ClientesTableSeeder extends Seeder {
 
public function run()
{
    $faker = Faker::create();
    for($i = 1; $i <= 5 ; $i++)
    {
        $cliente = new Cliente;

        $cliente->nombre        = $faker->name;
        $cliente->direccion     = $faker->address;
        $cliente->telefono      = $faker->phoneNumber;
        $cliente->email         = $faker->email;
        $cliente->municipio_id  = $faker->numberBetween(1,100); 
        $cliente->farmacia_id   = "2"; 
        $cliente->save();
       
    }
}
 
}