'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'stpa.morris', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers', 'farmaciaGeneral'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/sucursal/dashboard.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/sucursal/productos/productos.html'
		})
		.when('/clientes',{
			controller: 'ClientesCrtl',
			templateUrl: 'app/views/farmacia/clientes/clientes.html'
		})
		.when('/sucursal',{
			controller: 'SucursalCtrl',
			templateUrl: 'app/views/sucursal/informacion/form.html'
		})
		.when('/ventas',{
			controller: 'VentasCtrl',
			templateUrl: 'app/views/sucursal/ventas/ventas.html'
		})
		.when('/requisiciones',{
			controller: 'RequisicionesCtrl',
			templateUrl: 'app/views/sucursal/requisiciones/requisiciones.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/farmacia/usuarios/usuarios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
