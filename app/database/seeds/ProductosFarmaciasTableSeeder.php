<?php
     
use Faker\Factory as Faker;
     
class ProductosFarmaciasTableSeeder extends Seeder {
     
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 10 ; $i++)
        {
            $productoFarmacia = new ProductosFarmacia;

            $productoFarmacia->producto_id  = $i;
            $productoFarmacia->farmacia_id  = '2'; 
            $productoFarmacia->save();
           	
        }
    }
     
}