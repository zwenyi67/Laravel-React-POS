<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);
        
        if(!Auth::attempt($data)) {
            return response()->json([
                'message' => 'Invalid email or password',
            ], 401);
        }
    
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function register(Request $request) {

        //$data = $request->validated();

        $data = $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'required|email|unique:users,email',
            'password' => 'required'
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request) {
        $user = $request->user();

        $user->currentAccessToken()->delete();

        return response('',204);
    }
}
