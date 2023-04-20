<?php


namespace App\Services;


use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ValidateUserData
{
    protected $name;
    protected $email;
    protected $password;
    protected $pathAvatar;
    protected $rules = [];
    protected $message = [];

    public function __construct($name, $email,$password, $pathAvatar)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->pathAvatar = $pathAvatar;
    }

    public function validateRegistration()
    {
       $this->rules = [
           'name' => 'required',
           'email' => ['required', Rule::unique('users')],
           'password' => 'required|min:6',
           'path_avatar' => 'image',
       ];
       $this->message =  [
           'name.required' => 'Por favor, insira o nome',
           'email.required' => 'Por favor, insira o e-mail',
           'email.email' => 'Por favor, insira um e-mail que seja válido',
           'email.unique' => 'E-mail já cadastrado',
           'password.required' => 'Por favor insira uma senha',
           'password.min' => 'A senha deve ter pelo menos 6 caracteres',
           'path_avatar.image' => 'O arquivo não é um formato de imagem válido',
       ];

        $validate = Validator::make([
            'email'=> $this->email,
            'password'=>   $this->password,
            'name'=>   $this->name
            ],
            $this->rules,
            $this->message);

        return $validate;

    }

    public function validateLoginData()
    {
        $this->rules = [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];
        $this->message =  [
            'email.required' => 'Por favor, insira o e-mail',
            'email.email' => 'Por favor, insira um e-mail que seja válido',
            'password.required' => 'Por favor insira uma senha',
            'password.min' => 'A senha deve ter pelo menos 6 caracteres',
        ];
        $validate = Validator::make([
            'email'=> $this->email,
            'password'=>   $this->password
        ],
            $this->rules,
            $this->message);

        return $validate;

    }


    public function validateRegistrationUpdate()
    {
        $this->rules = [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',

        ];
        $this->message =  [
            'name.required' => 'Por favor, insira o nome',
            'email.required' => 'Por favor, insira o e-mail',
            'email.email' => 'Por favor, insira um e-mail que seja válido',
            'password.required' => 'Por favor insira uma senha',
            'password.min' => 'A senha deve ter pelo menos 6 caracteres',
        ];

        $validate = Validator::make([
            'name'=> $this->name,
            'email'=> $this->email,
            'password'=>   $this->password,
        ],
            $this->rules,
            $this->message);

        return $validate;

    }

    public function validateAvatarImage()
    {
        $this->rules = [
            'path_avatar' => 'image',
        ];
        $this->message =  [
            'path_avatar.image' => 'O arquivo não é um formato de imagem válido',
        ];
        $validate = Validator::make([
            'path_avatar'=>   $this->pathAvatar
        ],
            $this->rules,
            $this->message);

        return $validate;

    }


}
