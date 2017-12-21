<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->create();
            $table->increments('id');
            $table->string('username');
            $table->string('password');
            $table->string('name');
            $table->date('birthday');
            $table->string('address');
            $table->string('email')->unique();
            $table->string('facebook');
            $table->string('phone', 15);
            $table->smallInteger('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles');
            $table->integer('avatar_id')->unsigned();
            $table->foreign('avatar_id')->references('id')->on('img_pictures');
            $table->timestamps();
            $table->boolean('status');
            //$table->rememberToken();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropIfExists();
        });
    }

}
