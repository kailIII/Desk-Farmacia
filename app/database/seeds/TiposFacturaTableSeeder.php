<?php

class TiposFacturaTableSeeder extends Seeder 
{
    public function run() 
    {
        
        TipoFactura::create(array(
            "nombre" => "Ticket",
            "inicio" => "1",
            "fin" => "100",
            "sucursal_id" => "2"
        ));
        TipoFactura::create(array(
            "nombre" => "Factura",
            "inicio" => "1",
            "fin" => "100",
            "sucursal_id" => "2"
        ));
        TipoFactura::create(array(
            "nombre" => "Credito Fiscal",
            "inicio" => "1",
            "fin" => "100",
            "sucursal_id" => "2"
        ));            

    }
}