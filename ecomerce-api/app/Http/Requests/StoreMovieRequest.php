<?php

namespace App\Http\Requests;

use App\Models\Movie;
use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{



    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'link_trailer' => 'required',
            'link_conteudo' => 'required',
            'id_classificacoes' => 'required',
            'app_path_cartaz_vertical' => 'required',
            'app_path_cartaz_destaque' => 'required',
            'app_path_banner_destaque' => 'required',
            'app_path_miniatura_horizontal' => 'required',
            'tv_path_cartaz_miniatura' => 'required',
            'tv_path_cartaz_destaque' => 'required',
            'tv_path_banner_destaque' => 'required',
            'web_path_cartaz_miniatura' => 'required',
            'web_path_cartaz_destaque' => 'required',
            'web_path_banner_destaque' => 'required',
            'titulo' => 'required',
            'titulo_traduzido' => 'required',
            'ano' => 'required',
            'descricao' => 'required',
            'tamanho_arquivo' => 'required',
            'categorias' => 'required',
            'generos' => 'required',
            'diretores' => 'required',
            'playlists' => 'required',
            'elencos' => 'required',
            'tags' => 'required',

        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages(): array
    {
        return[
            'link_trailer.required' => 'O campo Link Do Trailer \ Teaser é obrigatório',
            'link_conteudo.required' => 'O campo Link Do Conteúdo é obrigatório',
            'id_classificacoes.required' => 'O campo Classificação é obrigatório',
            'app_path_cartaz_vertical.required' => 'O campo Cartaz vertical 2:3 é obrigatório',
            'app_path_cartaz_destaque.required' => 'O campo Cartaz destaque 3:2  2:3 é obrigatório',
            'app_path_banner_destaque.required' => 'O campo Banner de destaque 5:6 é obrigatório',
            'app_path_miniatura_horizontal.required' => 'O campo Miniatura Horizontal 14:9 é obrigatório',
            'tv_path_cartaz_miniatura.required' => 'O campo Cartaz miniatura 3:2  é obrigatório',
            'tv_path_cartaz_destaque.required' => 'O campo Cartaz destaque 12:7 é obrigatório',
            'tv_path_banner_destaque.required' => 'O campo Cartaz destaque 12:7 é obrigatório',
            'web_path_cartaz_miniatura.required' => 'O campo Cartaz miniatura 13:9 é obrigatório',
            'web_path_cartaz_destaque.required' => 'O campo Cartaz destaque 15:8  é obrigatório',
            'web_path_banner_destaque.required' => 'O campo Banner de destaque 5:2 15:8 é obrigatório',
            'titulo.required' => 'O campo Título Original é obrigatório',
            'titulo_traduzido.required' => 'O campo Título Traduzido é obrigatório',
            'ano.required' => 'O campo Ano é obrigatório',
            'descricao.required' => 'O campo Detalhes é obrigatório',
            'tamanho_arquivo.required' => 'O campo Tamanho Arquivo é obrigatório',
            'categorias.required' => 'O campo Escolher Categoria é obrigatório',
            'generos.required' => 'O campo Escolher Gênero é obrigatório',
            'diretores.required' => 'O campo Direção é obrigatório',
            'elencos.required' => 'O campo Escolher Elenco é obrigatório',
            'tags.required' => 'O campo Escolher Tags é obrigatório',
        ];
    }
}
