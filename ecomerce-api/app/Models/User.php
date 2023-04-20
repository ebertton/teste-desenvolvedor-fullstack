<?php

namespace App\Models;


use App\Services\GenerateCodeService;
use Exception;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory;
    protected $fillable = [
        'nome',
        'email',
        'password',
        'email_verificado',
        'email_verificado_em',
    ];
    protected $hidden = [
        'password',
        'remember_token',

    ];
    protected $casts = [
        'email_verificado_at' => 'datetime',
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function password(): Attribute
    {
        return Attribute::make(
            set: fn($value) => Hash::make($value),
        );
    }

    /**
     * @throws Exception
     */
    public function generateCode(): string
    {
        $cod = GenerateCodeService::generateCode();

        while (DB::table('password_resets')->where('email', '=', $this->email)->where('token', '=', $cod)->exists()) {
            $cod = GenerateCodeService::generateCode();
        }
        return $cod;

    }

}
