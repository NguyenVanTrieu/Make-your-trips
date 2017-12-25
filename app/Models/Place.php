<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Place
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $subaddress
 * @property float $latitude
 * @property float $longtitude
 * @property string $note
 * @property int $subject_id
 * @property \Carbon\Carbon $arrive_at
 * @property \Carbon\Carbon $leave_at
 * @property int $plan_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\Plan $plan
 *
 * @package App\Models
 */
class Place extends Eloquent
{
	protected $casts = [
		'latitude' => 'float',
		'longtitude' => 'float',
		'subject_id' => 'int',
		'plan_id' => 'int'
	];

	protected $dates = [
		'arrive_at',
		'leave_at'
	];

	protected $fillable = [
		'name',
		'address',
		'subaddress',
		'latitude',
		'longtitude',
		'note',
		'subject_id',
		'arrive_at',
		'leave_at',
		'plan_id'
	];

	public function plan()
	{
		return $this->belongsTo(\App\Models\Plan::class);
	}
}
