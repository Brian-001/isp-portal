<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Customer extends Model
{
    //
    use HasFactory;

    protected $fillable = [
        'full_name',
        'phone_number',
        'alt_phone_number',
        'email',
        'location_name',
        'estate_building',
        'gps_lat',
        'gps_long',
        'tower_site_name',
        'tower_site_number',
        'status',
        'status_reason',
    ];
}
