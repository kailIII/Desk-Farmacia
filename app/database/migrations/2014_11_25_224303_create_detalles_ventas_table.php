<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetallesVentasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('detalles_ventas',function($table) {
            $table->increments('id');

            $table->integer('cantidad');
            $table->double('precio',6,2);
            $table->integer('venta_id')->unsigned();
            $table->integer('producto_sucursal_id')->unsigned();
            
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
		Schema::drop('detalles_ventas');
	}

}
