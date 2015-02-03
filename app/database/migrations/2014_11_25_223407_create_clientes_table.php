<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClientesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('clientes',function($table) {
            $table->increments('id');

			$table->string('nombre',100);
			$table->text('direccion',300);
            $table->string('telefono', 10);
			$table->string('email', 100)->unique();
            $table->integer('municipio_id')->unsigned();
            $table->integer('farmacia_id')->unsigned();

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
		Schema::drop('clientes');
	}

}