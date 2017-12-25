<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Plan
 * 
 * @property int $id
 * @property string $name
 * @property string $subject
 * @property string $description
 * @property string $note
 * @property int $owner_id
 * @property \Carbon\Carbon $start_time
 * @property \Carbon\Carbon $end_time
 * @property bool $status
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * 
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $places
 *
 * @package App\Models
 */
class Plan extends Eloquent
{
	protected $casts = [
		'owner_id' => 'int',
		'status' => 'bool'
	];

	protected $dates = [
		'start_time',
		'end_time'
	];

	protected $fillable = [
		'name',
		'subject',
		'description',
		'note',
		'owner_id',
		'start_time',
		'end_time',
		'status'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'owner_id');
	}

	public function places()
	{
		return $this->hasMany(\App\Models\Place::class);
	}
}
