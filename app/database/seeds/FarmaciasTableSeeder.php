<?php
     
use Faker\Factory as Faker;
     
class FarmaciasTableSeeder extends Seeder {
     
    public function run()
    {

        $faker = Faker::create();
        for($i = 1; $i <= 2 ; $i++)
        {
            $Farmacia = new Farmacia;

            $Farmacia->nombre        = $faker->company;
            $Farmacia->direccion     = $faker->address;
            $Farmacia->telefono      = $faker->phoneNumber;
            $Farmacia->web           = $faker->domainName;
            $Farmacia->email         = $faker->email;
            $Farmacia->activa        = true;
            $Farmacia->municipio_id  = $faker->numberBetween(1,200); 
            $Farmacia->save();
           	
        }
    }
     
}