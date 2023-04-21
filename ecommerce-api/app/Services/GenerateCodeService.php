<?php

namespace App\Services;

class GenerateCodeService
{

    /**
     * @return string
     * @throws \Exception
     */
    public static function  generateCode(): string
    {
        $cod = '';
        for ($i = 0; $i < 4; $i++ ) {
            $cod = $cod . random_int(0, 9);
        }
        return $cod;
    }

}
