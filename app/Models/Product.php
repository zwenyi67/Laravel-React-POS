<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function sales()
{
    return $this->belongsToMany(Sale::class, 'sale_product', 'product_id', 'sale_id')->withPivot('quantity');
}
}
