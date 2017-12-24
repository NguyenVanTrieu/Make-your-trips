<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImgPicture extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('img_pictures', function (Blueprint $table) {
            $table->create();
            $table->increments('id');
            $table->string('location');
            $table->string('link');
            $table->boolean('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('img_pictures', function (Blueprint $table) {
            $table->dropIfExists();
        });
    }
}
