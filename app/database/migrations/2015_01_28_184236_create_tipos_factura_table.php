<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTiposFacturaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tipos_factura',function($table) {
            $table->increments('id');
                        
            $table->string('nombre',100);
            $table->integer('inicio');
            $table->integer('fin');
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
		Schema::drop('tipos_factura');
	}

}
