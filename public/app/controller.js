'use strict';

angular.module('farmaciaGeneral', [])


.controller('MainCtrl', function (Api, $scope, $log, $modal) {

	// Manejar el titulo
		$scope.titulo = "Dashboard";
		$scope.header = function(l){
			$log.info(l);
			$scope.titulo = l;
		};
		
	// Perfil
		$scope.usuario = {};
 		
 		$scope.cargarDatos = function(usuario_id){
 			Api.get('usuario/'+ usuario_id).then(function(data){
 				$scope.usuario = data;
	 		});
 		};


		$scope.modalactualizar = function (usuario) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/perfil/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, $modal, usuario) {
	     		$scope.usuario = usuario;
	     		$scope.imagenes = [{'nombre':'avatar_1.png'},{'nombre':'avatar_2.png'},{'nombre':'avatar_3.png'},{'nombre':'avatar_4.png'},{'nombre':'avatar_5.png'}];
				$scope.select = function(img){
					$scope.usuario.avatar = img.nombre;
				};
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('actualizar', usuario).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.usuario = data;
			  			},
							function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        usuario: function () {
		          return $scope.usuario;
		        }
		    }});
		};

});