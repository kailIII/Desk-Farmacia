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
	     		$scope.Ok = function(producto){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close(producto);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			}
	    });

	    modalInstance.result.then(function (producto) {
  			Api.post('productos/guardar', producto).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.productos.push(producto);
				$scope.producto = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);			  	 
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

	$scope.eliminar = function(producto){
		if (confirm('¿Desea eliminar el Registro?')) {
			Api.post('productos/eliminar/'+ producto.id).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				for (var i in $scope.productos ) {
					if ($scope.productos[i].id === data.id ){
						$scope.productos.splice(i, 1);
					}
				}
  			},
				function (data){
					$scope.alertas = data;
				}
  			);
  				
		}
	};

})

.controller('ClientesCrtl', function (Api, $scope, $modal, $log){
	$scope.clientes = [];
	$scope.alertas = []
	$scope.cliente = {};

    Api.get('clientes/ver').then(function(data){
		$scope.clientes = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var clientes = [];
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
			  			Api.post('clientes/guardar', cliente).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							clientes.push(cliente);
							$scope.cliente = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);	
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close(clientes);
				};
			}
	    });

	    modalInstance.result.then(function (clientes) {
	    	for (var i = clientes.length - 1; i >= 0; i--) {
	    		$scope.clientes.unshift(clientes[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (cliente_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, cliente) {
	     		$scope.cliente = cliente;
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.cliente);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        cliente: function () {
		          return cliente_id;
		        }
		    }
	    });
	    modalInstance.result.then(function (cliente) {
  			Api.post('clientes/guardar', cliente).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.cliente = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};

	$scope.eliminar = function(cliente){
		if (confirm('¿Desea eliminar el Registro?')) {
			Api.post('clientes/eliminar/'+ cliente.id).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				for (var i in $scope.clientes ) {
					if ($scope.clientes[i].id === data.id ){
						$scope.clientes.splice(i, 1);
					}
				}
  			},
				function (data){
					$scope.alertas = data;
				}
  			);
  				
		}
	};

})

.controller('ProveedoresCtrl', function (Api, $scope, $modal, $log){
	$scope.proveedores = [];
	$scope.alertas = []
	$scope.proveedor = {};

    Api.get('proveedores/ver').then(function(data){
		$scope.proveedores = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/proveedores/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var proveedores = [];
	     		$scope.Ok = function(proveedor){
	     			if (!formulario.$invalid) {
			  			Api.post('proveedores/guardar', proveedor).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							proveedores.push(proveedor);
							$scope.proveedor = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close(proveedores);
				};
			}
	    });

	    modalInstance.result.then(function (proveedores) {
  			for (var i = proveedores.length - 1; i >= 0; i--) {
	    		$scope.proveedores.unshift(proveedores[i]);
	    	};  	 
	    });
	};

	$scope.modalactualizar = function (proveedor_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/proveedores/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, proveedor) {
	     		$scope.proveedor = proveedor;
	     		$scope.Ok = function(proveedor){
	     			if (!formulario.$invalid) {
	     				$log.info(proveedor);
			  	 		$modalInstance.close($scope.proveedor);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        proveedor: function () {
		          return proveedor_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (proveedor) {
  			Api.post('proveedores/guardar', proveedor).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.proveedor = {};
  			},
				function (data){
					$log.info(data);
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};
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
	     	controller:  function ($scope, $modalInstance) {
	     		var farmacias = [];
	     		$scope.Ok = function(farmacia){
	     			if (!formulario.$invalid) {
			  			Api.post('farmacias/guardar', farmacia).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							farmacias.push(farmacia);
							$scope.farmacia = {};
							$scope.municipio = [];
							$scope.departamento = [];
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
	     	controller:  function ($scope, $modalInstance, farmacia) {
	     		$scope.farmacia = farmacia;
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

.controller('ComprasCtrl', function (Api, $scope, $modal, $log){
	$scope.compras = [];
	$scope.alertas = []
	$scope.compra = {};

    Api.get('compras/ver').then(function(data){
		$scope.compras = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/compras/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance) {
	     		$scope.Ok = function(compra){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close(compra);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			}
	    });

	    modalInstance.result.then(function (compra) {
  			Api.post('compras/guardar', compra).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.compras.push(compra);
				$scope.compra = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);			  	 
	    });
	};

	$scope.modalactualizar = function (compra_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/compras/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, compra) {
	     		$scope.compra = compra;
	     		$scope.Ok = function(compra){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.compra);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        compra: function () {
		          return compra_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (compra) {
  			Api.post('compras/guardar', compra).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$log.info(data);
				$scope.compra = {};
  			},
				function (data){
					$log.info(data);
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};
})

.controller('VentasCtrl', function (Api, $scope, $modal, $log){
	$scope.ventas = [];
	$scope.alertas = []

    Api.get('ventas/ver').then(function(data){
		$scope.ventas = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/ventas/form.html',
	      	windowClass:'full',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		
	     		$scope.tipos = [{'id':'1','nombre':'Ticket'},{'id':'2','nombre':'Recibo'},{'id':'2','nombre':'Factura'}];
	     		$scope.total = 0;
	     		$scope.ventas = [];
	     		$scope.venta = {};
	     		$scope.detalles = [];
	     		$scope.detalle = {};
	     		
	     		$scope.AddVenta = function(venta){
	     			if (!form_venta.$invalid) {
			  	 		$scope.venta = venta;
			  	 		$scope.ventas.push(venta);
			  	 	}
			  	};
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {
	     				$scope.total = $scope.total + (detalle.precio * detalle.cantidad);
			  	 		$scope.detalles.push(detalle);
			  	 		$log.info(detalle);
			  	 		$scope.detalle = {};
			  	 		$scope.txtproducto = "";
			  	 		$scope.disponibles = "";
			  			$scope.detalle.precio = "";
			  			$scope.descripcion = "";
			  	 	}
			  	};
			  	$scope.eliminar = function(id){
			  		$log.info(id);
			  		$scope.detalles.splice(id, 1);
			  	};
			  	$scope.buscarCliente = function(txtcliente){
			  		$scope.results = [];
			  		Api.get('busquedacliente/'+ txtcliente).then(function(data){
			  			$scope.results = data;
			  			$scope.venta.cliente_id = "";
			  		});
			  	};
			  	$scope.selectCliente = function(result){
			  		$scope.venta.cliente_id = result.id;
			  		$scope.txtcliente = result.nombre;
			  		$scope.results = [];
			  	};

			  	$scope.buscarProducto = function(txtproducto){
			  		$scope.results = [];
			  		Api.get('busquedaproducto/'+ txtproducto).then(function(data){
			  			$scope.results = data;
			  			$scope.disponibles = "";
			  			$scope.detalle.precio = "";
			  			$scope.descripcion = "";
			  		});
			  	};
			  	$scope.selectProducto = function(result){
			  		$scope.detalle.producto_id = result.id;
			  		$scope.disponibles = result.cantidad;
			  		$scope.detalle.precio = result.precio;
			  		$scope.descripcion = result.tipo + " " + result.unidades + " " + result.unidad;
			  		$scope.txtproducto = result.nombre;
			  		$scope.results = [];
			  	};
			  	$scope.Ok = function(){
			  		var ventaTotal = $scope.ventas.concat($scope.detalles);
			  		$log.info(ventaTotal);
  		  			Api.post('ventas/guardar', ventaTotal).then(function(data){
  						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				  		$scope.venta = {};
				  		$scope.txtcliente = "";
				  		$scope.detalles = [];
  		  			},
  						function (data){
  							$scope.alertas = data;
  						}
  		  			);			  	 		  				
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close($scope.ventas);
				};
			}
	    });

	    modalInstance.result.then(function (ventas) {
	    	for (var i = ventas.length - 1; i >= 0; i--) {
	    		$scope.ventas.unshift(ventas[i]);
	    	};
	    });
	};

})

.controller('RequisicionesCtrl', function (Api, $scope, $modal, $log){
	$scope.requisiciones = [];
	$scope.alertas = []
	$scope.requicion = {};

    Api.get('requisiciones/ver').then(function(data){
		$scope.requisiciones = data;
	});

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/requisiciones/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance) {
	     		$scope.Ok = function(requicion){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close(requicion);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			}
	    });

	    modalInstance.result.then(function (requicion) {
  			Api.post('requisiciones/guardar', requicion).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$scope.requisiciones.push(requicion);
				$scope.requicion = {};
  			},
				function (data){
					$scope.alertas = data;
				}
  			);			  	 
	    });
	};

	$scope.modalactualizar = function (requicion_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/requisiciones/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, requicion) {
	     		$scope.requicion = requicion;
	     		$scope.Ok = function(requicion){
	     			if (!formulario.$invalid) {
			  	 		$modalInstance.close($scope.requicion);
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        requicion: function () {
		          return requicion_id;
		        }
		    }
	    });

	    modalInstance.result.then(function (requicion) {
  			Api.post('requisiciones/guardar', requicion).then(function(data){
				$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				$log.info(data);
				$scope.requicion = {};
  			},
				function (data){
					$log.info(data);
					$scope.alertas = data;
				}
  			);					  	 
	    });
	};
})

.controller('DireccionCtrl', function (Api, $scope, $log){

    Api.get('departamentos').then(function(data){
		$scope.departamentos = data;
		if ($scope.dep > 0) {
			$scope.departamento= data[$scope.dep - 1];
			$scope.getmunicipio($scope.muni);
		};
	});

	Api.get('municipios/0').then(function(data){
		$scope.municipios = data;
	});

	$scope.select_departamento = function(id){
		Api.get('municipios/'+ id).then(function(data){
			$scope.municipios = data;
		});
	};

	$scope.getmunicipio = function(id){
		Api.get('municipio/'+ id).then(function(data){
			$scope.municipio = $scope.municipios[id - 1];
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

})

.controller('BuscadoresCtrl', function (Api, $scope, $log){

	$scope.buscarCliente = function(txt){
		$scope.results = [];
		Api.get('busquedacliente/'+ txt).then(function(data){
			$scope.results = data;
			$scope.venta.cliente_id = "";
		});
	};

	$scope.selectCliente = function(result){
		$scope.venta.cliente_id = result.id;
		$scope.txt = result.nombre;
		$scope.results = [];
	};

	$scope.buscarProducto = function(txt){
		$scope.results = [];
		Api.get('busquedaproducto/'+ txt).then(function(data){
			$scope.results = data;
			$scope.disponibles = "";
			$scope.detalle.precio = "";
			$scope.descripcion = "";
		});
	};

	$scope.selectProducto = function(result){
		$scope.detalle.producto_id = result.id;
		$scope.disponibles = result.cantidad;
		$scope.detalle.precio = result.precio;
		$scope.descripcion = result.tipo + " " + result.unidades + " " + result.unidad;
		$scope.txt = result.nombre;
		$scope.results = [];
	};


});