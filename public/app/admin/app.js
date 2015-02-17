'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'stpa.morris', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers', 'farmaciaGeneral'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/admin/dashboard.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/admin/productos/productos.html'
		})
		.when('/categorias',{
			controller: 'CategoriasCtrl',
			templateUrl: 'app/views/admin/categorias/categorias.html'
		})
		.when('/farmacias',{
			controller: 'FarmaciasCtrl',
			templateUrl: 'app/views/admin/farmacias/farmacias.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/admin/usuarios/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
