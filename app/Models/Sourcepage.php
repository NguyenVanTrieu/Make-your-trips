<?php

/**
 * Created by Reliese Model.
 * Date: Mon, 25 Dec 2017 03:39:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Sourcepage
 * 
 * @property int $id
 * @property string $sourecepage
 * @property string $descriptions
 * @property bool $status
 * 
 * @property \Illuminate\Database\Eloquent\Collection $infolinks
 *
 * @package App\Models
 */
class Sourcepage extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'status' => 'bool'
	];

	protected $fillable = [
		'sourecepage',
		'descriptions',
		'status'
	];

	public function infolinks()
	{
		return $this->hasMany(\App\Models\Infolink::class);
	}
}
