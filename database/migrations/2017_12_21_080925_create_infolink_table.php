<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInfolinkTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('infolinks', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('created_at');
            $table->integer('sourcepage_id')->unsigned();
            $table->foreign('sourcepage_id')->references('id')->on('sourcepages');
            $table->integer('add_by')->unsigned();
            $table->foreign('add_by')->references('id')->on('users');
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
        Schema::dropIfExists('infolinks');
    }
}
