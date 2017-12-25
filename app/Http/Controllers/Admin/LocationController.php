<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models;
use League\Flysystem\Exception;

class LocationController extends Controller
{
    public function getAddLocation()
    {
        return view('admin.addlocation');
    }

    public function  postAddLocation(Request $request){
        $location = array(
            'name' => $request->input('name'),
            'address' => $request->input('address'),
            'subaddress' => $request->input('address'),
            'title' => $request->input('title'),
            'description'=> $request->input('description'),
            'subdescription' => $request->input('description'),
            'headding' => $request->input('headding'),
            'subject' => $request->input('subject'),
            'latitude' => $request->input('lat'),
            'longtitude' => $request->input('lon'),
            'tag' => $request->input('tag')
        );
        try{
            Models\Location::created($location);
            return redirect()->back()->with('alert', 'Thêm' .$request->input('name') .' thành công');
        }catch (Exception $e){
            return redirect()->back()->with('alert', 'Đã xảy ra lỗi');
        }
    }


}
