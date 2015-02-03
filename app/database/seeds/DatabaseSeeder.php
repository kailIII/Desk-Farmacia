<?php

class DatabaseSeeder extends Seeder {

	public function run()
	{
    	Eloquent::unguard();
            // $this->call('PaisTableSeeder');
            // $this->call('DepartamentosTableSeeder');
            // $this->call('MunicipiosTableSeeder');
            // $this->call('CategoriasTableSeeder');
            // $this->call('SubCategoriasTableSeeder');
            // $this->call('TiposFacturaTableSeeder');
            // $this->call('TipoUsuariosTableSeeder');
            
            // $this->call('FarmaciasTableSeeder');
            // $this->call('UsuariosTableSeeder');
            // $this->call('SucursalesTableSeeder');
            // $this->call('ClientesTableSeeder');
            // $this->call('ProveedoresTableSeeder');
            // $this->call('ProductosTableSeeder');
            // $this->call('ProductosFarmaciasTableSeeder');
            $this->call('ProductosSucursalesTableSeeder');
            
	}

}
