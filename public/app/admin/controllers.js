'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function() {

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){

	$scope.productos = [];
	$scope.producto = {};
	$scope.alertas = [];

    Api.get('productos/ver').then(function(data){
		$scope.productos = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/productos/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var productos = [];
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
	      	templateUrl: 'app/views/productos/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, producto) {
	     		$scope.producto = producto;
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

    Api.get('farmacias/ver').then(function(data){
		$scope.farmacias = data;
	});

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
			  	 		$modalInstance.close($scope.farmacia);
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

	    modalInstance.result.then(function (farmacia) {
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
	    });
	};
})

.controller('SucursalesCtrl', function (Api, $scope, $modal, $log){
	$scope.sucursales = [];
	$scope.sucursal = {};
	$scope.alertas = [];

    Api.get('sucursales/ver').then(function(data){
		$scope.sucursales = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance) {
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close(sucursal);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			}
	    });

	    modalInstance.result.then(function (sucursal) {
  			Api.post('sucursales/guardar', sucursal).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.sucursales.push(sucursal);
				$scope.sucursal = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);			  	 
	    });
	};

	$scope.modalactualizar = function (sucursal_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, sucursal) {
	     		$scope.sucursal = sucursal;
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.sucursal);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        sucursal: function () {
		          return sucursal_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (sucursal) {
  			Api.post('sucursales/guardar', sucursal).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$log.info(data);
				$scope.sucursal = {};
  			},
				function (data){
					$log.info(data);
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};

})

.controller('CategoriasCtrl', function (Api, $scope, $log){

    Api.get('categorias').then(function(data){
		$scope.categorias = data;
		if ($scope.cat > 0) {
			$scope.categoria = data[$scope.cat - 1];
			$scope.getsubcategoria($scope.subcat);
		};
	});

	Api.get('subcategorias/0').then(function(data){
		$scope.subcategorias = data;
	});

	$scope.select_categoria= function(id){
		Api.get('subcategorias/'+ id).then(function(data){
			$scope.subcategoria = data;
			$log.info(id);
		});
	};

	$scope.getsubcategoria = function(id){
		Api.get('subcategoria/'+ id).then(function(data){
			$scope.subcategoria = $scope.subcategorias[id - 1];
		});
	};

});