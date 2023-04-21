# Sobre o Projeto

Com base nos requisitos mínimos desenvolvi uma aplicação de e-comerce.\
Ele atende todos os requisitos solicitados tentando aplicar da melhor forma possível para fazer sentido no fluxo de navegação.

Para que a aplicação seja executada sem erros é necessário o instalar o node.js versão 18+ em seu sistema(https://nodejs.org/en/download/) e ter o mysql 5.7+ instalado em seu ambiente local.

# Stacks utilizadas (Client)
Para a interface com o cliente foi utilizado React JS versão 18, com as seguintes dependências de desenvolvimento:
- fortawesome ^6.4.0 para utilizar biblioteca de ícones. 
- reduxjs/toolkit ^1.9.3 para persistir os dados armazenados pelo redux em toda a aplicação.
- axios ^1.3.5 para requisições http.
- classnames ^2.3.2 para evitar sobreposição de css.
- react ^18.2.0 para desenvolvimento do frontend.
- react-redux ^8.0.5 para o gerenciamento de estado.
- react-router-dom ^6.10.0 para um melhor gerenciamento da navegação entre as rotas.
- typescript ^4.9.5 para o desenvolvimento da aplicação.



# Stacks utilizadas (SERVER)
O servidor foi desenvolvido em Laravel versão 9.11 e optei pelo banco de dados Mysql.
A aplicação utiliza das seguintes dependências: 
- php ^8.0.2 para desenvolvimento. 
- laravel/framework ^9.11 para desenvolvimento sa API. 
- php-open-source-saver/jwt-auth ^1.4 para a criação de token JWT, garantindo maior segurança no módulo de autenticação dos usuários.

## Pré requisitos para instalação:
- PHP 8.0.2+
- MySQL 5.7+ 
- Node v18.15.0+
- Composer version 2.5.4+ 

## Iniciando o projeto CLIENT

Acessando o projeto no diretório "client" execute os comandos na ordem:

### 1 - `npm install`
### 2 - `npm start`

Abra [http://localhost:3000](http://localhost:3000) para visualizar o projeto.\

## Iniciando o projeto SERVER

Criando a base de dados
- Conecte-se ao servidor MySQL: mysql -u [username] -p[password]
- Crie a base de dados: CREATE DATABASE [database_name]

Configurando o .env

### 1 - `Faça um copiar do arquivo .env.exemple e renomei para .env`
### 2 - `No arquivo .env em DB_DATABASE insira o nome da base de dados mysql `
### 3 - `No arquivo .env em DB_USERNAME insira o nome de usuário do seu servidor de banco de dados mysql `
### 4 - `No arquivo .env em DB_PASSWORD insira a senha de usuário do seu servidor de banco de dados mysql `


Acessando o projeto no diretório "ecommerce" execute os comandos na ordem:
### 1 - `composer install`
### 2 - `php artisan generat:key`
### 3 - `php artisan migrate --seed`
### 4 - `php artisan serve`
A API ficará disponível na seguinte URL [http://localhost:8000](http://localhost:8000).\

Utilizando docker para startar o servidor:
- Na raiz do projeto após ter executado o comando `composer install` e `php artisan generat:key`, execute os seguintes comandos:
### 1 - `php artisan sail:install`
### 2 - `Opção [0]`
### 3 - `./vendor/bin/sail up -d`
A API ficará disponível na seguinte URL [http://localhost](http://localhost).\




Documentação da API URL [https://documenter.getpostman.com/view/20378449/2s93Y2T2cX](https://documenter.getpostman.com/view/20378449/2s93Y2T2cX).\

Modelagem do banco de dados [https://drive.google.com/file/d/1x-YU3vRGuJAsSjqXHB1T6ptN5JqAAwIk/view?usp=sharing](https://drive.google.com/file/d/1x-YU3vRGuJAsSjqXHB1T6ptN5JqAAwIk/view?usp=sharing).\

