<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
 * 
 * @property int $id
 * @property string $username
 * @property string $password
 * @property string $name
 * @property \Carbon\Carbon $birthday
 * @property string $address
 * @property string $email
 * @property string $facebook
 * @property string $phone
 * @property int $role_id
 * @property int $avatar_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property bool $status
 * 
 * @property \App\Models\ImgPicture $img_picture
 * @property \App\Models\Role $role
 * @property \Illuminate\Database\Eloquent\Collection $infolinks
 * @property \Illuminate\Database\Eloquent\Collection $plans
 *
 * @package App\Models
 */
class User extends Eloquent
{
	protected $casts = [
		'role_id' => 'int',
		'avatar_id' => 'int',
		'status' => 'bool'
	];

	protected $dates = [
		'birthday'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'username',
		'password',
		'name',
		'birthday',
		'address',
		'email',
		'facebook',
		'phone',
		'role_id',
		'avatar_id',
		'status'
	];

	public function img_picture()
	{
		return $this->belongsTo(\App\Models\ImgPicture::class, 'avatar_id');
	}

	public function role()
	{
		return $this->belongsTo(\App\Models\Role::class);
	}

	public function infolinks()
	{
		return $this->hasMany(\App\Models\Infolink::class, 'add_by');
	}

	public function plans()
	{
		return $this->hasMany(\App\Models\Plan::class, 'owner_id');
	}
}
