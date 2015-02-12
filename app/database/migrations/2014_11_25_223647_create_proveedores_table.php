<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProveedoresTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('proveedores',function($table) {
            $table->increments('id');

            $table->string('nombre', 50);
            $table->text('direccion', 300);
            $table->string('telefono', 10);
            $table->string('email', 100);//->unique();
            $table->string('contacto', 100);
            $table->string('tel_contacto', 10);
            $table->string('email_contacto', 100);
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
		Schema::drop('proveedores');
	}

}
