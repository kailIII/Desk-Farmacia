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
.directive('venta',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/ventas/venta.html"
	}
})
.directive('detalle',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/ventas/detalle.html"
	}
})
.directive('factura',function(){
	return {
		restrict: "E",
		templateUrl: "app/views/ventas/factura.html"
	}
});