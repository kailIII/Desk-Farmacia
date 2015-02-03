<?php
class DepartamentosTableSeeder extends Seeder 
{
    public function run() 
    {
        $departamentos = ["Ahuachapán",
                          "Santa Ana",
                          "Sonsonate",
                          "La Libertad",
                          "Chalatenango",
                          "San Salvador",
                          "Cuscatlán",
                          "La Paz",
                          "Cabañas",
                          "San Vicente",
                          "Usulután",
                          "Morazán",
                          "San Miguel",
                          "La Unión"
                         ];
        
        for($f=0; $f<count($departamentos); $f++) {
            Departamento::create(array(
                "nombre" => $departamentos[$f],
                "pais_id" => 1
            ));    
        }
    }
}