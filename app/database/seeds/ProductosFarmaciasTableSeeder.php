<?php
     
use Faker\Factory as Faker;
     
class ProductosFarmaciasTableSeeder extends Seeder {
     
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 10 ; $i++)
        {
            $productoFarmacia = new ProductosFarmacia;

            $productoFarmacia->cantidad     = $faker->numberBetween(1,30);
            $productoFarmacia->minimo       = $faker->numberBetween(5,10);
            $productoFarmacia->precio       = $faker->numberBetween(1,15);
            $productoFarmacia->producto_id  = $i;
            $productoFarmacia->farmacia_id  = '2'; 
            $productoFarmacia->save();
           	
        }
    }
     
}