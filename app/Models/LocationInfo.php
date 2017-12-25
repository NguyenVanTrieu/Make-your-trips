<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class LocationInfo
 * 
 * @property int $location_id
 * @property int $info_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Infolink $infolink
 * @property \App\Models\Location $location
 *
 * @package App\Models
 */
class LocationInfo extends Eloquent
{
	protected $table = 'location_info';
	public $incrementing = false;

	protected $casts = [
		'location_id' => 'int',
		'info_id' => 'int'
	];

	protected $fillable = [
		'location_id',
		'info_id'
	];

	public function infolink()
	{
		return $this->belongsTo(\App\Models\Infolink::class, 'info_id');
	}

	public function location()
	{
		return $this->belongsTo(\App\Models\Location::class);
	}
}
