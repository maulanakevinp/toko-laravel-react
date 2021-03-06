<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name') }}</title>
    <link rel="stylesheet" href="{{ asset('/css/app.css') }}">
    <meta name="base-url" content="{{ url('/') }}">
</head>

<body>
    <div id="root" style="margin-top: 100px"></div>
    <script src="{{ asset('/js/app.js') }}"></script>
</body>

</html>
