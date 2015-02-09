<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
</head>
<body>

<center style="display: table;table-layout: fixed;width: 100%;min-width: 620px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;background-color: #fbfbfb">

<br>
	<div style="font-size: 26px;font-weight: 700;letter-spacing: -0.02em;line-height: 32px;color: #41637e;font-family: sans-serif;text-align: center" align="center">
		@if ($usuario->tipo->id < 3)
            Sistema Farmacia: "{{$usuario->farmacia->nombre}}".
        @else
            Sistema Farmacia: "{{$usuario->sucursal->nombre}}".
        @endif
	</div>
<br>

<div style="border: 1px solid #E0E0E0; width:600px; margin:auto; margin-bottom:50px; padding:20px; box-shadow: 0px 0px 15px #E0E0E0;">            
    <h1 style="color: #565656;font-weight: 700;font-size: 36px;font-family: sans-serif">
    	Hola: {{$usuario->user}}!!!
    </h1>

    <p style="color: #565656;font-family: sans-serif;font-size: 16px;">
    	Estos son los datos de acceso para el sistema:
    </p>
    
    <p style="color: #565656;font-family: sans-serif;font-size: 16px; text-aling:center;">
    	Usuario: <strong style="font-weight: bold">{{$usuario->email}}</strong><br>
		Contraseña: <strong style="font-weight: bold">{{$pass}}</strong>
	</p>
	
	<div class="btn" style="text-align: center; margin:50px;">
	    <a style="border: 1px solid #ffffff;font-size: 14px;font-weight: bold;outline-style: solid;outline-width: 2px;padding: 10px 30px;text-align: center;text-decoration: none !important;color: #fff !important;font-family: sans-serif;background-color: #41637e;outline-color: #41637e;"
	    href="{{route('login')}}" target="_blank">Entrar al Sistema</a>
	</div>

</div>


</center>

</body>
</html>