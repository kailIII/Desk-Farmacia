'use strict';

/* Directives */


angular.module('farmaciaDirectives', []).

directive('appVersion', ['version', function(version) {
return function(scope, elm, attrs) {
  elm.text(version);
};
}])

.directive('toolbar',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/toolbar.html"
	}
})

.directive('opciones',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/opciones.html"
	}
})

.directive('ubicacion',function(){
	return {
		restrict: "E",
		scope: {
		    tabla: '=tabla'
		},
		templateUrl: "app/views/ubicacion.html"
	}
})

.directive('alertas',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/alertas.html"
	}
})

// Ventas
.directive('venta',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/sucursal/ventas/venta.html"
	}
})
.directive('detalle',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/sucursal/ventas/detalle.html"
	}
})
.directive('factura',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/sucursal/ventas/factura.html"
	}
})

// Compras
.directive('compra',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/farmacia/compras/compra.html"
	}
})
.directive('detallecompra',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/farmacia/compras/detalle.html"
	}
})
.directive('facturacompra',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/farmacia/compras/factura.html"
	}
});