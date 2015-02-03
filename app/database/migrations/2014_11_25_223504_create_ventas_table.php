<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVentasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('ventas',function($table) {
            $table->increments('id');

            $table->timestamp('fecha');
            $table->string('factura',100);
            $table->integer('tipo_factura_id')->unsigned();
            $table->integer('cliente_id')->unsigned();
            $table->integer('sucursal_id')->unsigned();
            
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
		Schema::drop('ventas');
	}

}
