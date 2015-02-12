'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/dashboard_sucursal.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/productos_sucursal/productos.html'
		})
		.when('/clientes',{
			controller: 'ClientesCrtl',
			templateUrl: 'app/views/clientes/clientes.html'
		})
		.when('/sucursal',{
			controller: 'SucursalCtrl',
			templateUrl: 'app/views/sucursal/form.html'
		})
		.when('/ventas',{
			controller: 'VentasCtrl',
			templateUrl: 'app/views/ventas/ventas.html'
		})
		.when('/requisiciones',{
			controller: 'RequisicionesCtrl',
			templateUrl: 'app/views/requisiciones/requisiciones.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/usuarios_admin/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
