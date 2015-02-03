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
		.when('/clientes',{
			controller: 'ClientesCrtl',
			templateUrl: 'app/views/clientes/clientes.html'
		})
		.when('/proveedores',{
			controller: 'ProveedoresCtrl',
			templateUrl: 'app/views/proveedores/proveedores.html'
		})
		.when('/farmacias',{
			controller: 'FarmaciasCtrl',
			templateUrl: 'app/views/farmacias/farmacias.html'
		})
		.when('/sucursales',{
			controller: 'SucursalesCtrl',
			templateUrl: 'app/views/sucursales/sucursales.html'
		})
		.when('/compras',{
			controller: 'ComprasCtrl',
			templateUrl: 'app/views/compras/compras.html'
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
			templateUrl: 'app/views/usuarios/usuarios.html'
		})
		.when('/laboratorios',{
			controller: 'VentasCtrl',
			templateUrl: 'app/views/laboratorios/laboratorios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
