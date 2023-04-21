<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_orders_id');
            $table->bigInteger('products_id')->nullable();
            $table->string('name')->nullable();
            $table->string('description')->nullable();
            $table->integer('provider')->nullable();
            $table->string('material')->nullable();
            $table->string('department')->nullable();
            $table->decimal('price', 10,2)->nullable();
            $table->bigInteger('amount')->nullable();
            $table->timestamps();
            $table->foreign('purchase_orders_id')->references('id')->on('purchase_orders');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_items');
    }
};
