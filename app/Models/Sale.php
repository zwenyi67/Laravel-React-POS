<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $table = 'sales';

    protected $guarded = [];

    public function products()
{
    return $this->belongsToMany(Product::class, 'sale_product', 'sale_id', 'product_id')->withPivot('quantity');
}

}
