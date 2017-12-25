<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/redirect/{social}', 'SocialAuthController@redirect');
Route::get('/callback/{social}', 'SocialAuthController@callback');

Route::get('/login', function (){
    return view('auth.login');
});

Route::get('trang-chu', function (){
    return view('client.index');
});
Route::get('trang-chi-tiet', function (){
    return view('client.info');
});
Route::get('tao-lich-trinh', function (){
    return view('client.maketrip');
});

Route::group(['prefix'=>'admin'], function(){

    Route::get('them-dia-diem', 'Admin\LocationController@getAddLocation');
    Route::post('them-dia-diem', 'Admin\LocationController@postAddLocation');
});