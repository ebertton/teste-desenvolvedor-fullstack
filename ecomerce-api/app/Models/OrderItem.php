<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        "purchase_orders_id",
        "name",
        "description",
        "products_id",
        "provider",
        "material",
        "department",
        "price",
        "amount"
    ];

}
