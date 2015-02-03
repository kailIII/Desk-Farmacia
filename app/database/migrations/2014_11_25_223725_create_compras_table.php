<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComprasTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('compras',function($table) {
            $table->increments('id');
                        
            $table->timestamp('fecha');
            $table->string('factura', 20);
            $table->string('lote', 100);
            $table->date('vencimiento');
            $table->integer('proveedor_id')->unsigned();
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
		Schema::drop('compras');
	}

}
