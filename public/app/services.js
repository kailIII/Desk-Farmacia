'use strict';

angular.module('farmaciaServices', [])

.factory('Api', function ($http, $q){

// Direccion donde se piden los datos
var url = "http://localhost:8080/Desk-Farmacia/public/api/";

    function get(url){
		var defer = $q.defer();

		$http.get('api/' + url)
			.success(function (data){
				defer.resolve(data);
			})
			.error(function (data){
				defer.reject();
			})
		return defer.promise; 
	}

	function post(url, data){
		var defer = $q.defer();
		$http.post('api/' + url, data)
			.success(function (data, code){
				if(code==201)
					defer.resolve(data);
				else
					defer.reject(data);
			})
			.error( function (data){
				$.growl('No hay conexión al servidor', {type: 'warning'});
			})
		return defer.promise;
	}
	return {
		get		: get,
		post	: post
	}
});

// .factory('Library', function (Api){

//     function guardar(url, data){
// 		$.growl('Guardando...', {type: 'info'});
// 		Api.post(url, data).then(function(data){
// 			$.growl('Proceso Exitoso', {type: 'success'});
// 		},
// 			function (data){
// 				$.growl('Error: ' + data, {type: 'warning'});
// 			}
// 		);
// 		return true;
// 	}
// 	function eliminar(url, data){
// 		$.growl('Eliminando...', {type: 'info'});
// 		Api.post(url, data).then(function(data){
// 			$.growl('Proceso Exitoso', {type: 'success'});
// 		},
// 			function (data){
// 				$.growl('Error: ' + data, {type: 'warning'});
// 			}
// 		);
// 		return true;
// 	}

// 	return {
// 		guardar		: guardar,
// 		eliminar	: eliminar
// 	}

// });
