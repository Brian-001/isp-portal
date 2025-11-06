<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('phone_number')->unique();
            $table->string('alt_phone_number')->nullable();
            $table->string('email')->unique();
            $table->string('location_name')->nullable();
            $table->string('estate_building')->nullable();
            $table->decimal('gps_lat', 10, 7)->nullable();
            $table->decimal('gps_long', 10, 7)->nullable();
            $table->string('tower_site_name')->nullable();
            $table->string('tower_site_number')->nullable();
            $table->enum('status', ['active', 'pending', 'terminated', 'suspended'])->default('pending');
            $table->text('status_reason')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
