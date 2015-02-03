<?php
     
use Faker\Factory as Faker;
     
class ProductosSucursalesTableSeeder extends Seeder {
     
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 10 ; $i++)
        {
            $productoSucursal = new ProductosSucursal;

            $productoSucursal->precio        = $faker->numberBetween(1,15);
            $productoSucursal->cantidad      = $faker->numberBetween(10,35); 
            $productoSucursal->minimo        = $faker->numberBetween(1,5);
            $productoSucursal->ubicacion     = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, eius!";
            $productoSucursal->sucursal_id   = '2';
            $productoSucursal->producto_farmacia_id = $i;
            $productoSucursal->save();
           	
        }
    }
     
}