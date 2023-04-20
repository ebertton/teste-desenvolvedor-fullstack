<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Jobs\EmailResetCode;
use App\Jobs\EmailVerification;
use App\Models\PasswordReset;
use App\Models\User;
use App\Services\ValidateUserData;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    protected User $user;

    protected PasswordReset $passwordReset;

    public function __construct()
    {
        $this->user = new User();
        $this->passwordReset = new PasswordReset();
    }

    /**
     * Salvar novo usuário
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validator = new ValidateUserData($request->name, $request->email, $request->password, '');
        if ($validator->validateRegistration()->fails()) {
            return response()->json(['erros' => $validator->validateRegistration()->errors()], 400);
        }
        $this->user->name = $request->name;
        $this->user->email = $request->email;
        $this->user->password = $request->password;
        $this->user->save();
        // Essa linha comentada seria para envio de e-mail de verificação de conta de usuário, porém não foi implmentada no front-end.
        // EmailVerification::dispatch(Hash::make($this->user->id), $this->user->email)->delay(now()->addSeconds(15));
        $credentials = ['email' => $request->email, 'password' => $request->password];
        $token = auth('api')->attempt($credentials);

        return response()->json([
            'user' => auth('api')->user(),
            'token' => [
                'access_token' => $token,
                'token_type' => 'bearer'
            ]
        ], 201);
    }

    /**
     * Atualizar dados de usuário
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $user): JsonResponse
    {
        $user = User::find($user);
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->password && $request->password !== '') {
            $user->password = $request->password;
        }
        $user->cidade = $request->cidade;
        $user->save();

        $token = auth('api')->tokenById(auth('api')->user()->id);

        return response()->json([
            'user' => $user,
            'token' => [
                'access_token' => $token,
                'token_type' => 'bearer'
            ]
        ], 201);
    }
    /**
     * Redefinição de senha de usuário
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function resetRequest(Request $request)
    {
        if (in_array('', $request->only('email'))) {
            return response()->json('', 400);
        }
        if ($user = User::where('email', '=', $request->email)->first()) {

            $this->passwordReset->email = $request->email;
            $this->passwordReset->codigo = $user->generateCode();
            $currentDate = date('Y-m-d H:i:s');
            $this->passwordReset->prazo_expiracao = date('Y-m-d H:i:s', strtotime('+1 day', strtotime($currentDate)));
            $this->passwordReset->save();
            EmailResetCode::dispatch($this->passwordReset->codigo, $this->passwordReset->email)->delay(now()->addSeconds(15));
            return response()->json(['email' => $this->passwordReset->email], 200);

        }
        return response()->json('E-mail não cadastrado, informe o e-mail correto ou entre em contato com o suporte!', 400);
    }

    /**
     * Validação de codigo de segurança para redefiinição de senha de usuário
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function validateCode(Request $request)
    {
        if (in_array('', $request->only('code'))) {
            return response()->json('Por favor, informe o código enviado para o e-mail informado!', 400);
        }

        if ($passwordReset = $this->passwordReset->where('email', '=', $request->email)
            ->where('codigo', '=', $request->code)->whereDate('prazo_expiracao', '>=', date('Y-m-d H:i:s'))->first()) {
            return response()->json(['email' => $passwordReset->email], 200);
        }
        return response()->json('Código inválido ou expirado!', 400);

    }

    /**
     * Atualização de senha de usuário
     *
     * @param \Illuminate\Http\Request $request
     * @return JsonResponse
     */
    public function updatePassword(Request $request)
    {
        if (!$this->passwordReset->where('email', '=', $request->email)->where('codigo', '=', $request->code)->whereDate('prazo_expiracao', '>=', date('Y-m-d H:i:s'))->first()) {
            return response()->json('Código inválido ou expirado!', 400);
        }
        if (in_array('', $request->only('password'))) {
            return response()->json('Por favor, informe a nova senha!', 400);
        }
        if (in_array('', $request->only('password_confirm'))) {
            return response()->json('Por favor, confirme a nova senha!', 400);
        }
        if ($request->password !== $request->password_confirm) {
            return response()->json('As senha são diferentres!', 400);
        }
        if ($user = $this->user->whereEmail($request->email)->first()) {
            $user->password = $request->password;
            $user->save();
            return response()->json('', 204);
        }
        return response()->json('Código inválido', 400);

    }

}
