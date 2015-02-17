'use strict';

var app = angular.module('farmacia', ['ngRoute', 'ui.bootstrap', 'farmaciaFilters', 'farmaciaServices', 'farmaciaDirectives', 'farmaciaControllers', 'farmaciaGeneral'])

.config(['$routeProvider', function ($routeProvider){
	$routeProvider
		.when('/',{
			controller: 'DashboardCtrl',
			templateUrl: 'app/views/farmacia/dashboard.html'
		})
		.when('/productos',{
			controller: 'ProductosCtrl',
			templateUrl: 'app/views/farmacia/productos/productos.html'
		})
		.when('/clientes',{
			controller: 'ClientesCrtl',
			templateUrl: 'app/views/farmacia/clientes/clientes.html'
		})
		.when('/proveedores',{
			controller: 'ProveedoresCtrl',
			templateUrl: 'app/views/farmacia/proveedores/proveedores.html'
		})
		.when('/compras',{
			controller: 'ComprasCtrl',
			templateUrl: 'app/views/farmacia/compras/compras.html'
		})
		.when('/farmacia',{
			controller: 'FarmaciaCtrl',
			templateUrl: 'app/views/farmacia/informacion/form.html'
		})
		.when('/sucursales',{
			controller: 'SucursalesCtrl',
			templateUrl: 'app/views/farmacia/sucursales/sucursales.html'
		})
		.when('/ventas',{
			controller: 'VentasCtrl',
			templateUrl: 'app/views/farmacia/ventas/ventas.html'
		})
		.when('/requisiciones',{
			controller: 'RequisicionesCtrl',
			templateUrl: 'app/views/farmacia/requisiciones/requisiciones.html'
		})
		.when('/usuarios',{
			controller: 'UsuariosCtrl',
			templateUrl: 'app/views/farmacia/usuarios/usuarios.html'
		})
		.when('/laboratorios',{
			controller: 'LaboratoriosCtrl',
			templateUrl: 'app/views/farmacia/laboratorios/laboratorios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
