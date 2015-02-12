<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRequisicionesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('requisiciones',function($table){
            $table->increments('id');
                        
            $table->timestamp('fecha');
            $table->enum('estado', array('1'=>'Enviado', '2'=>'En Proceso', '3'=>'Realizado'));
            $table->integer('sucursal1_id')->unsigned();
			$table->integer('sucursal2_id')->unsigned();

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
		Schema::drop('requisiciones');
	}

}
