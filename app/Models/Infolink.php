<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Infolink
 * 
 * @property int $id
 * @property \Carbon\Carbon $created_at
 * @property int $sourcepage_id
 * @property int $add_by
 * @property bool $status
 * 
 * @property \App\Models\User $user
 * @property \App\Models\Sourcepage $sourcepage
 * @property \App\Models\LocationInfo $location_info
 *
 * @package App\Models
 */
class Infolink extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'sourcepage_id' => 'int',
		'add_by' => 'int',
		'status' => 'bool'
	];

	protected $fillable = [
		'sourcepage_id',
		'add_by',
		'status'
	];

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'add_by');
	}

	public function sourcepage()
	{
		return $this->belongsTo(\App\Models\Sourcepage::class);
	}

	public function location_info()
	{
		return $this->hasOne(\App\Models\LocationInfo::class, 'info_id');
	}
}
