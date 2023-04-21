<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int|mixed|string|null $users_id
 */
class PurchaseOrder extends Model
{
    use HasFactory;

    protected $appends = [
        'total_items',
        'total_price'
    ];

    /**
     * @return Attribute
     */
    public function totalItems(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->orderItems()->get()->sum('amount')
        );
    }

    /**
     * @return Attribute
     */
    public function totalPrice(): Attribute
    {
        return Attribute::make(get: fn() => $this->orderItems()->get()->sum('price'));
    }

    /**
     * @return HasMany
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class,'purchase_orders_id','id');
    }
}
