'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/dashboard_admin.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/productos_admin/productos.html'
		})
		.when('/categorias',{
			controller: 'CategoriasCtrl',
			templateUrl: 'app/views/categorias/categorias.html'
		})
		.when('/farmacias',{
			controller: 'FarmaciasCtrl',
			templateUrl: 'app/views/farmacias/farmacias.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/usuarios_admin/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
