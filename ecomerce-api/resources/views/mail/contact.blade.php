@component('mail::message')
    # Motivo do contato: {{ $motive }}
    E-mail: {{ $email }}
    {{ $message }}

@endcomponent
