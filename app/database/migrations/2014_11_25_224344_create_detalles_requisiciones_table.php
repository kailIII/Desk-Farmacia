<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetallesRequisicionesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('detalles_requisiciones',function($table) {
            $table->increments('id');

            $table->integer('cantidad');
            $table->integer('requisicion_id')->unsigned();
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
		Schema::drop('detalles_requisicion');
	}

}
