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
            $table->integer('sucursal_id')->unsigned();
			$table->integer('sucursal_2_id')->unsigned();

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
