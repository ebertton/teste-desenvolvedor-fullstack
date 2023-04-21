<style>

    .mt-6 {
        margin-top: 5.5rem !important;
    }

    .text-center {
        text-align: center !important;
    }

    .row > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--bs-gutter-x) * 0.5);
        padding-left: calc(var(--bs-gutter-x) * 0.5);
        margin-top: var(--bs-gutter-y);
    }

    .text-center {
        text-align: center !important;
    }

    .mt-5 {
        margin-top: 3rem !important;
    }

    .row > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--bs-gutter-x) * 0.5);
        padding-left: calc(var(--bs-gutter-x) * 0.5);
        margin-top: var(--bs-gutter-y);
    }

    element.style {
    }

    .text-aquarius {
        --bs-text-opacity: 1;
        color: rgb(222, 74, 42);
    }

    p {
        margin-top: 0;
        margin-bottom: 1rem;
    }

    b, strong {
        font-weight: bolder;
    }

    .align-items-center {
        align-items: center !important;
    }

    .justify-content-center {
        justify-content: center !important;
    }

    .d-flex {
        display: flex !important;
    }

    .mt-2 {
        margin-top: 0.5rem !important;
    }

    .row > * {
        flex-shrink: 0;
        width: 100%;
        max-width: 100%;
        padding-right: calc(var(--bs-gutter-x) * 0.5);
        padding-left: calc(var(--bs-gutter-x) * 0.5);
        margin-top: var(--bs-gutter-y);
    }



</style>
<div class="row d-flex justify-content-center" style="background-color: #fff8f0; ">

    <div class="row text-center" style="justify-content: center !important; padding-bottom: 70px; padding-top: 20px;">

        <div class="col-md-12 text-center mt-5">

            <div class="row d-flex justify-content-center">
                <div class="col-6">
                    <h2 class="text-aquarius" style="font-family: 'Poppins', sans-serif; color: rgb(222, 74, 42); text-align: center !important;">
                        Confirmação de e-mail aquarius</h2>

                    <p class="text-aquarius" style="font-family: 'Poppins', sans-serif; color: rgb(222, 74, 42); text-align: center !important;"><strong>Para
                            confirmar o e-mail basta clicar no botão abaixo, caso não reconheça
                            esse e-mail, favor desconsiderar!</strong></p>
                </div>

            </div>

            <div class="row d-flex justify-content-center">
                <div class="col-2">
                    <a href="{{ url( '/').'/email/check-email?token=' .$token }}"
                       style="color: white !important;
                       background-color: orange !important;
                       border-color: orange !important;
                       padding: 12px !important;
                       text-decoration: none !important;
                        border-radius: 5px !important;
                        font-family: 'Poppins', sans-serif !important; ">
                        <strong>Confirmar e-mail</strong>
                    </a>
                </div>
            </div>

        </div>

    </div>
</div>


