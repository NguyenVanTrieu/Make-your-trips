<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Location
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $subaddress
 * @property string $title
 * @property string $description
 * @property string $subdescription
 * @property string $headding
 * @property string $subject
 * @property float $latitude
 * @property float $longtitude
 * @property string $tag
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\LocationImg $location_img
 * @property \App\Models\LocationInfo $location_info
 *
 * @package App\Models
 */
class Location extends Eloquent
{
	protected $casts = [
		'latitude' => 'float',
		'longtitude' => 'float'
	];

	protected $fillable = [
		'name',
		'address',
		'subaddress',
		'title',
		'description',
		'subdescription',
		'headding',
		'subject',
		'latitude',
		'longtitude',
		'tag'
	];

	public function location_img()
	{
		return $this->hasOne(\App\Models\LocationImg::class);
	}

	public function location_info()
	{
		return $this->hasOne(\App\Models\LocationInfo::class);
	}
}
