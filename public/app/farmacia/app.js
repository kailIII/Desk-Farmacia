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
			templateUrl: 'app/views/productos_farmacia/productos.html'
		})
		.when('/clientes',{
			controller: 'ClientesCrtl',
			templateUrl: 'app/views/clientes/clientes.html'
		})
		.when('/proveedores',{
			controller: 'ProveedoresCtrl',
			templateUrl: 'app/views/proveedores/proveedores.html'
		})
		.when('/compras',{
			controller: 'ComprasCtrl',
			templateUrl: 'app/views/compras/compras.html'
		})
		.when('/farmacia',{
			controller: 'FarmaciaCtrl',
			templateUrl: 'app/views/farmacia/form.html'
		})
		.when('/sucursales',{
			controller: 'SucursalesCtrl',
			templateUrl: 'app/views/sucursales/sucursales.html'
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
		.when('/laboratorios',{
			controller: 'LaboratoriosCtrl',
			templateUrl: 'app/views/laboratorios/laboratorios.html'
		})
		.otherwise({
			redirectTo: '/'
		})
}]);
