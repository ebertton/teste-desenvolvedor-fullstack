<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\ValidateUserData;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $credentials = $request->only(['email', 'password']);
        $validator = new ValidateUserData('', $request->email, $request->password, '');
        if ($validator->validateLoginData()->fails()){
            return response()->json(['erros' => $validator->validateLoginData()->errors()], 400);
        }

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['erro' => 'Não autorizado'], 401);
        }

        return $this->respondWithToken($token);
    }


    protected function respondWithToken($token)
    {
        return response()->json( [
            'user' => User::where('id','=', auth('api')->id())->first(),
            'token' => [
            'access_token' => $token,
            'token_type' => 'bearer'
            ]
        ]);
    }

    public function logout()
    {
        auth('api')->logout();

        return response()->json(['mensagem' => 'Desconectado com sucesso']);
    }

    public function me()
    {


        if (!$token = auth('api')->tokenById(auth('api')->id()))
        {
            return response()->json(['erro' => 'Não autorizado'], 401);
        }

        return response()->json( [
            'user' => User::where('id','=', auth('api')->id())->first(),
            'token' => [
                'access_token' => $token,
                'token_type' => 'bearer'
            ]
        ]);
    }


}
