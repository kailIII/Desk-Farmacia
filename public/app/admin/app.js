'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/dashboard.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/productos/productos.html'
		})
		.when('/categorias',{
			controller: 'CategoriasCtrl',
			templateUrl: 'app/views/categorias/categorias.html'
		})
		.when('/farmacias',{
			controller: 'FarmaciasCtrl',
			templateUrl: 'app/views/farmacias/farmacias.html'
		})
		.when('/sucursales',{
			controller: 'SucursalesCtrl',
			templateUrl: 'app/views/sucursales/sucursales.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/usuarios/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
