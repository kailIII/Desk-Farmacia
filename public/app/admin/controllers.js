'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function() {

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){

	$scope.productos = [];
	$scope.producto = {};
	$scope.alertas = [];

	$scope.cargarDatos = function () {
    	Api.get('productos/ver').then(function(data){
			$scope.productos = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/productos_admin/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var productos = [];
	     		Api.get('categorias').then(function(data){
	     			$scope.categorias = data;
	     		});
	     		$scope.buscar_subcat = function(id){
	     			Api.get('subcategorias/'+ id).then(function(data){
	     				$scope.subcategorias = data;
	     			});
	     		};
	     		$scope.Ok = function(producto){
	     			if (!formulario.$invalid) {
			  			Api.post('productos/guardar', producto).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							productos.push(producto);
							$scope.producto = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);		
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close(productos);
				};
			}
	    });

	    modalInstance.result.then(function (productos) {
  			for (var i = productos.length - 1; i >= 0; i--) {
  				$scope.productos.unshift(productos[i]);
  			};  	 
	    });
	};

	$scope.modalactualizar = function (producto_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/productos_admin/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, producto) {
	     		$scope.producto = producto;
	     		Api.get('categorias').then(function(data){
	     			$scope.categorias = data;
	     			$scope.cat = $scope.categorias[producto.categoria_id-1];
	     			$scope.subcategorias = [{'id':producto.subcategoria_id,'nombre':producto.subcategoria}];
	     			$scope.subcat = $scope.subcategorias[0];
	     		});
	     		$scope.buscar_subcat = function(id){
	     			Api.get('subcategorias/'+ id).then(function(data){
	     				$scope.subcategorias = data;
	     			});
	     		};
	     		$scope.Ok = function(producto){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.producto);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        producto: function () {
		          return producto_id;
		        }
		    }
	    });
	    modalInstance.result.then(function (producto) {
  			Api.post('productos/guardar', producto).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$log.info(data);
				$scope.producto = {};
  			},
				function (data){
					$log.info(data);
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};

	// $scope.eliminar = function(producto){
	// 	if (confirm('¿Desea eliminar el Registro?')) {
	// 		Api.post('productos/eliminar/'+ producto.id).then(function(data){
	// 			$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
	// 			for (var i in $scope.productos ) {
	// 				if ($scope.productos[i].id === data.id ){
	// 					$scope.productos.splice(i, 1);
	// 				}
	// 			}
 //  			},
	// 			function (data){
	// 				$scope.alertas = data;
	// 			}
 //  			);
  				
	// 	}
	// };

})

.controller('FarmaciasCtrl', function (Api, $scope, $log, $modal){
	$scope.farmacias = [];
	$scope.farmacia = {};
	$scope.alertas = [];

	$scope.cargarDatos = function () {
	    Api.get('farmacias/ver').then(function(data){
			$scope.farmacias = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var farmacias = [];
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(farmacia){
	     			if (!formulario.$invalid) {
			  			Api.post('farmacias/guardar', farmacia).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							farmacias.push(farmacia);
							$scope.farmacia = {};
							$scope.municipios = [];
							$scope.departamentos = [];
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				   $modalInstance.close(farmacias);
				};
			}
	    });

	    modalInstance.result.then(function (farmacias) {
  			for (var i = farmacias.length - 1; i >= 0; i--) {
	    		$scope.farmacias.unshift(farmacias[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (farmacia_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacias/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, farmacia, $log) {
	     		$scope.farmacia = farmacia;
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[farmacia.departamento_id-1];
	     			$scope.municipios = [{'id':farmacia.municipio_id,'nombre':farmacia.municipio}];
	     			$scope.muni = $scope.municipios[0];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(farmacia){
	     			if (!formulario.$invalid) {
			  	 		Api.post('farmacias/guardar', farmacia).then(function(data){
  	 						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
  	 						$log.info(data);
  	 						$scope.farmacia = {};
  	 		  			},
  	 						function (data){
  	 							$log.info(data);
  	 							$scope.alertas = data;
  	 						}
  	 		  			);	
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        farmacia: function () {
		          return farmacia_id;
		        }
		    }
	    });
	};

})

.controller('UsuariosCtrl', function (Api, $scope, $log, $modal){
	$scope.usuarios = [];
	$scope.usuario = {};
	$scope.alertas = [];

    $scope.cargarDatos = function () {
	    Api.get('a_usuarios/ver').then(function(data){
			$scope.usuarios = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/usuarios_admin/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance,$log, Api) {
	     		var usuarios = [];
	     		$scope.tipos = [{'id':'1','nombre':'Admon'},{'id':'2','nombre':'Farmacia'}];
	     		$scope.c_farmacias = function(id){
	     			if(id==2){
	     				Api.get('farmacias/ver').then(function(data){
							$scope.farmacias = data;
						});
	     			}
	     			else{
	     				$scope.farmacias = [];
	     			}
		     		
	     		};
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
	     				$log.info(usuario);
			  			Api.post('a_usuarios/guardar', usuario).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							usuarios.push(usuario);
							$scope.usuario = {};
							$scope.farmacias = [];
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				   $modalInstance.close(usuarios);
				};
			}
	    });

	    modalInstance.result.then(function (usuarios) {
  			for (var i = usuarios.length - 1; i >= 0; i--) {
	    		$scope.usuarios.unshift(usuarios[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (usuario_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/usuarios_admin/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, usuario, $log) {
	     		$scope.usuario = usuario;
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.usuario);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        usuario: function () {
		          return usuario_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (usuario) {
  			Api.post('usuarios/guardar', usuario).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.usuario = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};
})

.controller('CategoriasCtrl', function (Api, $scope, $log, $modal){
	$scope.categorias = [];
	$scope.categoria = {};
	$scope.alertas = [];

	$scope.cargarDatos = function () {
	    Api.get('categorias/ver').then(function(data){
			$scope.categorias = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/categorias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var categorias = [];
	     		$scope.Ok = function(categoria){
	     			$log.info(categoria);
	     			if (!formulario.$invalid) {
			  			Api.post('categorias/guardar', categoria).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							categorias.push(categoria);
							$scope.categoria = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				   $modalInstance.close(categorias);
				};
			}
	    });

	    modalInstance.result.then(function (categorias) {
  			for (var i = categorias.length - 1; i >= 0; i--) {
	    		$scope.categorias.unshift(categorias[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (categoria_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/categorias/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, categoria, $log) {
	     		$scope.categoria = categoria;
	     		$scope.Ok = function(categoria){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.categoria);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        categoria: function () {
		          return categoria_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (categoria) {
  			Api.post('categorias/guardar', categoria).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.categoria = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};

});