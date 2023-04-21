<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="{{mix('css/app.css')}}" rel="stylesheet">
    <link rel="stylesheet" href="{{asset('font-awesome-4.7.0/css/font-awesome.min.css')}}">
    <title>aquarius - login</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div class="ajax_response"></div>
<div class="container">
    <style>
        .message {
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            width: 400px;
            flex-basis: 100%;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
            color: #ffffff;
            font-size: 0.875em;
            text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
            transition-duration: 0.3s;
            margin-bottom: 20px;
            border: 1px solid #333333;
            position: absolute;
            height: 100px;
            right: 5px;
        }
        .message p {
            flex-basis: 100%;
            width: 100%;
            display: block;
        }

        .message-green {
            color: #ffffff;
            background-color: #36BA9B;
            border-color: #2d9a81;
        }

        .message-blue {
            color: #ffffff;
            background-color: #39AED9;
            border-color: #2699c4;
        }

        .message-yellow {
            color: #ffffff;
            background-color: #F5B946;
            border-color: #f3aa1f;
        }

        .message-red {
            color: #ffffff;
            background-color: rgb(222, 74, 42);;
            border-color: #ca2939;
        }

        .message-orange {
            color: #ffffff;
            background-color: #F4645F;
            border-color: #f13f39;
        }
    </style>
    <div class="row">
        <div class="col-md-12 text-center mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="219.624" height="55.622" viewBox="0 0 219.624 55.622"><defs><clipPath id="a"><rect width="219.624" height="55.622" fill="#de4a2a"/></clipPath></defs><g transform="translate(0 0)"><path d="M406.873,76.262l12.106-.011L406.873,63.021Z" transform="translate(-211.016 -32.684)" fill="#de4a2a"/><g transform="translate(0 0)"><g clip-path="url(#a)"><path d="M8.946,55.127a15.466,15.466,0,0,0-2.541.4C1.468,56.705-.552,60.535.127,65.239A6.968,6.968,0,0,0,2.759,70c2.793,2.134,6.035,2.311,9.437,2.2V55.11c-1.164,0-2.211-.052-3.25.016" transform="translate(0 -28.572)" fill="#de4a2a"/><path d="M199.266,55.127a15.465,15.465,0,0,0-2.541.4c-4.937,1.175-6.957,5.005-6.278,9.709A6.969,6.969,0,0,0,193.079,70c2.793,2.134,6.035,2.311,9.437,2.2V55.11c-1.164,0-2.211-.052-3.25.016" transform="translate(-98.705 -28.572)" fill="#de4a2a"/><path d="M429.562,48.308A11.69,11.69,0,0,0,426.6,43.8q-6.042-6.315-12.079-12.636c-1.1-1.143-1.915-2.311-.632-3.956a7.806,7.806,0,0,0-5.563,1.866c-3.313,2.757-3.67,8.925-.673,12,4,4.1,7.786,8.411,11.685,12.611,1.078,1.162,1.854,2.335.739,3.9a10.008,10.008,0,0,0,4.58-.234c5.036-1.253,6.041-5.421,4.9-9.041" transform="translate(-210.36 -14.107)" fill="#de4a2a"/><path d="M129.566,28.284s-.047,12.616.048,18.923a24.482,24.482,0,0,0,.755,5.366,6.53,6.53,0,0,0,4.514,4.788,16.253,16.253,0,0,0,4.737.813c.6.021,1.693,0,1.693,0v-30.9H129.566Z" transform="translate(-67.19 -14.145)" fill="#de4a2a"/><path d="M172.915,27.273H161.168v30.9s1.1.023,1.693,0a16.269,16.269,0,0,0,4.737-.813,6.53,6.53,0,0,0,4.514-4.788,24.492,24.492,0,0,0,.755-5.366c.094-6.306.048-18.923.048-18.923Z" transform="translate(-83.586 -14.145)" fill="#de4a2a"/><path d="M343.42,28.284s-.047,12.616.048,18.923a24.483,24.483,0,0,0,.755,5.366,6.53,6.53,0,0,0,4.514,4.788,16.252,16.252,0,0,0,4.737.813c.6.021,1.693,0,1.693,0v-30.9H343.42Z" transform="translate(-178.101 -14.145)" fill="#de4a2a"/><path d="M386.77,27.273H375.023v30.9s1.1.023,1.694,0a16.269,16.269,0,0,0,4.737-.813,6.531,6.531,0,0,0,4.514-4.788,24.481,24.481,0,0,0,.755-5.366c.094-6.306.048-18.923.048-18.923Z" transform="translate(-194.498 -14.145)" fill="#de4a2a"/><path d="M75.342,27.509a13.11,13.11,0,0,0-11.03,10.283,21.565,21.565,0,0,0-.3,7.968A13.278,13.278,0,0,0,76.292,57.612c.228.022.772.051.772.051l-.015-30.334s-.8.046-1.707.18" transform="translate(-33.076 -14.174)" fill="#de4a2a"/><path d="M437.916,27.321h-12.1l12.1,12.689Z" transform="translate(-220.84 -14.169)" fill="#de4a2a"/><path d="M39.947,31.97a7.616,7.616,0,0,0-5.734-5.447,18.409,18.409,0,0,0-8.366.167c.2.177.118.137.438.412a11.348,11.348,0,0,1,1.391,1.591,8.34,8.34,0,0,1,1.416,4.393c.049.761.075,24.012.075,24.012H40.712s.054-13.955-.03-20.349a17.853,17.853,0,0,0-.735-4.78" transform="translate(-13.406 -13.539)" fill="#de4a2a"/><path d="M12.746,32.7a.385.385,0,0,1-.144-.327l.239-3.44a.384.384,0,0,0-.6-.347l-2.876,1.9a.383.383,0,0,1-.356.036l-3.2-1.29A.384.384,0,0,0,5.3,29.7l.922,3.323a.385.385,0,0,1-.076.349L3.932,36.013a.385.385,0,0,0,.278.631l3.445.15a.385.385,0,0,1,.309.18L9.793,39.9a.384.384,0,0,0,.685-.069l1.208-3.23a.385.385,0,0,1,.267-.238l3.346-.836a.385.385,0,0,0,.146-.674Z" transform="translate(-1.992 -14.794)" fill="#de4a2a"/><path d="M230.267,31.97a7.616,7.616,0,0,0-5.734-5.447,18.409,18.409,0,0,0-8.366.167c.2.177.118.137.438.412A11.345,11.345,0,0,1,218,28.693a8.34,8.34,0,0,1,1.416,4.393c.049.761.075,24.012.075,24.012h11.544s.054-13.955-.03-20.349a17.853,17.853,0,0,0-.735-4.78" transform="translate(-112.111 -13.539)" fill="#de4a2a"/><path d="M203.066,32.7a.383.383,0,0,1-.144-.327l.238-3.44a.384.384,0,0,0-.6-.347l-2.876,1.9a.383.383,0,0,1-.356.036l-3.2-1.29a.384.384,0,0,0-.514.459l.922,3.323a.384.384,0,0,1-.076.349l-2.215,2.643a.385.385,0,0,0,.278.631l3.445.15a.385.385,0,0,1,.309.18l1.829,2.923a.384.384,0,0,0,.685-.069l1.208-3.23a.385.385,0,0,1,.267-.238l3.346-.836a.385.385,0,0,0,.146-.674Z" transform="translate(-100.698 -14.794)" fill="#de4a2a"/><path d="M292.62,31.361a.383.383,0,0,1-.144-.327l.238-3.44a.384.384,0,0,0-.6-.347l-2.876,1.9a.385.385,0,0,1-.356.036l-3.2-1.29a.384.384,0,0,0-.514.459l.922,3.323a.384.384,0,0,1-.076.349l-2.215,2.643a.385.385,0,0,0,.278.631l3.445.15a.386.386,0,0,1,.309.18l1.829,2.923a.384.384,0,0,0,.685-.069l1.208-3.23a.385.385,0,0,1,.267-.238l3.345-.836a.385.385,0,0,0,.146-.674Z" transform="translate(-147.143 -14.098)" fill="#de4a2a"/><path d="M321.479,4.179a.383.383,0,0,1-.144-.327l.238-3.44a.384.384,0,0,0-.6-.347l-2.876,1.9a.383.383,0,0,1-.356.036l-3.2-1.29a.384.384,0,0,0-.514.459l.922,3.323a.384.384,0,0,1-.076.349l-2.215,2.643a.385.385,0,0,0,.278.631l3.445.15a.385.385,0,0,1,.309.18l1.829,2.923a.384.384,0,0,0,.685-.069l1.208-3.23a.384.384,0,0,1,.267-.238L324.031,7a.385.385,0,0,0,.146-.674Z" transform="translate(-162.11 0)" fill="#de4a2a"/><rect width="11.915" height="30.415" transform="translate(150.214 13.138)" fill="#de4a2a"/><rect width="11.758" height="42.483" transform="translate(47.404 13.138)" fill="#de4a2a"/><rect width="11.915" height="30.415" transform="translate(123.108 13.138)" fill="#de4a2a"/></g></g></g></svg>
        </div>

        <div class="col-md-12 text-center mt-5">
            <p class="text-aquarius"><strong>E-mail confirmado com sucesso!</strong></p>
        </div>


    </div>
</div>
</div>

</body>
</html>
