<?php

use Faker\Factory as Faker;
     
class ProductosTableSeeder extends Seeder {
     
    public function run()
    {
        $faker = Faker::create();
        for($i = 1; $i <= 10 ; $i++)
        {
            $producto = new Producto;

            $producto->nombre        = $faker->company;
            $producto->descripcion   = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae officiis, consequatur earum tenetur reprehenderit pariatur esse placeat voluptatum cumque optio.";
            $producto->tipo = $faker->randomElement(['Caja','Frasco','Sobre', 'Tubo'], $count = 1);
            $producto->unidad= $faker->randomElement(['ML','Tabletas','Capsulas', 'Inyección'], $count = 1);
            $producto->unidades = $faker->numberBetween(5,45);
            $producto->subcategoria_id  = $faker->numberBetween(1,35); 
            $producto->save();
           	
        }
    }
     
}