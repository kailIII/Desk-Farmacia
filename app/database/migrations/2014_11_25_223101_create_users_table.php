<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users',function($table){
            $table->increments('id');

            $table->string('user',50);
            $table->string('email', 100)->unique();
            $table->string('password',100);
            $table->string('avatar',100);
            $table->boolean('activa');
            $table->integer('sucursal_id')->unsigned();
            $table->integer('tipo_usuario_id')->unsigned();
            
            $table->rememberToken();
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
		Schema::drop('users');
	}

}
