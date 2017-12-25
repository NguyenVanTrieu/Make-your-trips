<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use Illuminate\Support\Facades\Log;
//use Laravel\Socialite\Facades\Socialite;
use Socialite;
class SocialAuthController extends Controller
{
    public function redirect()
    {
        $social = 'github';
        //dd($social);
        return Socialite::driver($social)->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function callback()
    {dd(123);
        $social = 'github';
        try {
            $user = Socialite::driver($social)->user();
            dd($user);
            $create['name'] = $user->name;
            $create['email'] = $user->email;
            $create['facebook_id'] = $user->id;


            //$userModel = new User;
            //$createdUser = $userModel->addNew($create);
            //Auth::loginUsingId($createdUser->id);
            return redirect()->route('home');
        } catch (Exception $e) {
            dd($e);
            return redirect('/');
        }

        // $user->token;
    }
}
