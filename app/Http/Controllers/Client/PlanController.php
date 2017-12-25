<?php

namespace App\Http\Controllers\Client;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlanController extends Controller
{


    public function ajaxRequest()
    {
        //$rs = json_decode($request->content(), true);
        writeln(request()->all());
        return response()->json(array('msg'=> '123'), 200);
    }
}
