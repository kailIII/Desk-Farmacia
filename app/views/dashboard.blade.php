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

        {{HTML::script('app/js/angular/angular.min.js')}}
        {{HTML::script('app/js/angular/angular-route.min.js')}}

        @if (Auth::user()->tipo->id == 1)
			{{HTML::script('app/admin/app.js')}}
            {{HTML::script('app/admin/controllers.js')}}
        @elseif(Auth::user()->tipo->id == 2)
            {{HTML::script('app/farmacia/app.js')}}
            {{HTML::script('app/farmacia/controllers.js')}}
        @else
			{{HTML::script('app/sucursal/app.js')}}
            {{HTML::script('app/sucursal/controllers.js')}}
        @endif
		
		{{HTML::script('app/controller.js')}}
        {{HTML::script('app/filters.js')}}
		{{HTML::script('app/directives.js')}}
		{{HTML::script('app/services.js')}}

    </head>
    <body class="skin-blue" ng-controller="MainCtrl" ng-init="cargarDatos({{Auth::user()->id}});">
        <!-- Header -->
		@include("dashboard/header")
        <!-- <div ng-include src="'app/views/topmenu.html'"></div> -->
        <!-- <?php //include("/app/views/topmenu.html"); ?> -->

        <!-- Body -->
        <div class="wrapper row-offcanvas row-offcanvas-left">

            @include("dashboard/aside")

        </div>

        <!-- JS -->
        @include("includes/librerias_js")
        
    </body>
</html>