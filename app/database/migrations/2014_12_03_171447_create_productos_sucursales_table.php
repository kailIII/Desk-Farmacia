<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductosSucursalesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('productos_sucursales',function($table){
            $table->increments('id');

            $table->double('precio',6,2);
            $table->integer('cantidad');
            $table->integer('minimo');	
            $table->string('ubicacion',300);
            $table->integer('sucursal_id')->unsigned();
            $table->integer('producto_farmacia_id')->unsigned();

			$table->softDeletes();
            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('productos_sucursales');
	}

}
