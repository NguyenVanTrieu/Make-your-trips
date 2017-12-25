<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LocationImg
 * 
 * @property int $location_id
 * @property int $img_id
 * @property int $order_sort
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\ImgPicture $img_picture
 * @property \App\Models\Location $location
 *
 * @package App\Models
 */
class LocationImg extends Eloquent
{
	protected $table = 'location_img';
	public $incrementing = false;

	protected $casts = [
		'location_id' => 'int',
		'img_id' => 'int',
		'order_sort' => 'int'
	];

	protected $fillable = [
		'location_id',
		'img_id',
		'order_sort'
	];

	public function img_picture()
	{
		return $this->belongsTo(\App\Models\ImgPicture::class, 'img_id');
	}

	public function location()
	{
		return $this->belongsTo(\App\Models\Location::class);
	}
}
