<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class ImgPicture
 * 
 * @property int $id
 * @property string $location
 * @property string $link
 * @property bool $status
 * 
 * @property \App\Models\LocationImg $location_img
 * @property \Illuminate\Database\Eloquent\Collection $users
 *
 * @package App\Models
 */
class ImgPicture extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'status' => 'bool'
	];

	protected $fillable = [
		'location',
		'link',
		'status'
	];

	public function location_img()
	{
		return $this->hasOne(\App\Models\LocationImg::class, 'img_id');
	}

	public function users()
	{
		return $this->hasMany(\App\Models\User::class, 'avatar_id');
	}
}
