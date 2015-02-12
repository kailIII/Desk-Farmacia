<!DOCTYPE html>
<html lang="es" ng-app="farmacia">
    <head>
	   <meta charset="utf-8">
	   <meta name="description" content="Sistema de farmacia">
	   <meta name="viewport" content="width=device-width, initial-scale=1.0">
	   <title>Farmacia</title>

        <!-- CSS -->
        @include("includes/librerias_css")
        <!-- Angular -->
        @if (Auth::user()->tipo->id == 1)
            @include("includes/librerias_angular_admin")
        @elseif(Auth::user()->tipo->id == 2)
            @include("includes/librerias_angular_farmacia")
        @else
            @include("includes/librerias_angular_sucursal")
        @endif

    </head>
    <body class="skin-blue" ng-controller="MainCtrl">
        <?php 
            $usuario = new stdClass();

            $user = explode(" ", Auth::user()->user);
            $usuario->nombre = $user[0]. ', '.end($user). '    ';
            $usuario->tipo = Auth::user()->tipo->definicion;
            $usuario->avatar = Auth::user()->avatar;
            if (Auth::user()->tipo->id <= 2) {
                $usuario->sucursal = Auth::user()->farmacia->nombre;
            }else{
                $usuario->sucursal = Auth::user()->sucursal->nombre;
            }
        ?>
        <!-- Header -->
        @include("dashboard/header")

        <!-- Body -->
        <div class="wrapper row-offcanvas row-offcanvas-left">

            @include("dashboard/aside")

        </div>

        <!-- JS -->
        @include("includes/librerias_js")
        
    </body>
</html>