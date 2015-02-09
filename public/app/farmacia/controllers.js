'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function() {

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){

	$scope.productos = [];
	$scope.producto = {};
	$scope.alertas = [];


	$scope.vencimiento = function(v){
		if (Date.parse(v) < Date.now())
			return true
		return false
	};
	
	$scope.cargarDatos = function () {
	    Api.get('f_productos/ver').then(function(data){
			$scope.productos = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/productos_farmacia/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var selects = [];
	     		
     			Api.get('addproductos').then(function(data){
     				$scope.items = data;
     			});

     			$scope.select = function (p) {
				 	var idx = selects.indexOf(p);
				 	if (idx > -1) {
				      	selects.splice(idx, 1);
				    }
				    else{
				    	selects.push(p);
				    }
				};
				$scope.all = function(){
					$('input[name=productos]').each(function () {
					    this.checked = !this.checked;
					    if(!this.checked){
					    	selects = [];
					    }
					    else{
					    	selects.push(JSON.parse(this.value));
					    }
					});
				}
	     		$scope.Ok = function(){
	     			if (!formulario.$invalid) {
	     				for (var i = selects.length - 1; i >= 0; i--) {
			  	 		Api.post('f_productos/guardar', selects[i]).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}]; 
							$scope.producto = {};
			  			},
						function (data){
							$scope.alertas = data;
						});
	     				};
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close(selects);
				};
			}
	    });

	    modalInstance.result.then(function (productos) {
  			for (var i = 0; i <= productos.length - 1; i++) {
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

	$scope.cargarDatos = function(){
	    Api.get('clientes/ver').then(function(data){
			$scope.clientes = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var clientes = [];
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
			  			Api.post('clientes/guardar', cliente).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							clientes.push(cliente);
							$scope.cliente = {};
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
				    $modalInstance.close(clientes);
				};
			}
	    });

	    modalInstance.result.then(function (clientes) {
	    	for (var i = 0; i <= clientes.length - 1; i++) {
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
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[cliente.departamento_id-1];
	     			$scope.municipios = [{'id':cliente.municipio_id,'nombre':cliente.municipio}];
	     			$scope.muni = $scope.municipios[0];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
			  	 		Api.post('clientes/guardar', cliente).then(function(data){
  	 						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
  	 		  			},
  	 					function (data){
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
		        cliente: function () {
		          return cliente_id;
		        }
		    }
	    });
	};

	// $scope.eliminar = function(cliente){
	// 	if (confirm('¿Desea eliminar el Registro?')) {
	// 		Api.post('clientes/eliminar/'+ cliente.id).then(function(data){
	// 			$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
	// 			for (var i in $scope.clientes ) {
	// 				if ($scope.clientes[i].id === data.id ){
	// 					$scope.clientes.splice(i, 1);
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

.controller('ProveedoresCtrl', function (Api, $scope, $modal, $log){
	$scope.proveedores = [];
	$scope.alertas = []
	$scope.proveedor = {};

	$scope.cargarDatos = function(){
        Api.get('proveedores/ver').then(function(data){
    		$scope.proveedores = data;
    	});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/proveedores/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var proveedores = [];
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
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
  			for (var i = 0; i <= proveedores.length - 1; i++) {
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
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[cliente.departamento_id-1];
	     			$scope.municipios = [{'id':cliente.municipio_id,'nombre':cliente.municipio}];
	     			$scope.muni = $scope.municipios[0];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(proveedor){
	     			if (!formulario.$invalid) {
	     				$log.info(proveedor);
			  	 		Api.post('proveedores/guardar', proveedor).then(function(data){
  	 						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
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
		        proveedor: function () {
		          return proveedor_id;
		        }
		    }
	    });
	};
})

.controller('ComprasCtrl', function (Api, $scope, $modal, $log){
	$scope.compras = [];
	$scope.alertas = []
	$scope.compra = {};

    $scope.cargarDatos = function(){
        Api.get('compras/ver').then(function(data){
    		$scope.compras = data;
    	});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/compras/form.html',
	      	windowClass:'full',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var d = new Date();
	     		$scope.ingresados = [];

	     		$scope.iniciar = function(){
	     			$scope.compras = [];
	     			$scope.compra = {};
	     			$scope.detalles = [];
	     			$scope.detalle = {};
		     		$scope.total = 0;
		     		$scope.compra.fecha = Date.now();
		     		$scope.compra.vencimiento = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		     		$scope.detalle.cantidad = 1;
		     		$scope.view = false;
		     		$scope.txtproducto = "";
		     		$scope.txtlaboratorio = "";
	     		};

	     	// Proveedor
			  	$scope.buscarProveedor = function(txt){
			  		$scope.results = [];
			  		if (txt != "") {
			  		Api.get('busquedaproveedor/'+ txt).then(function(data){
			  			$scope.results = data;
			  			$scope.compra.proveedor_id = "";
			  		});};
			  	};
			  	$scope.selectProveedor = function(result){
			  		$scope.compra.proveedor_id = result.id;
			  		$scope.compra.proveedor = result.nombre;
			  		$scope.txtproveedor = result.nombre;
			  		$scope.results = [];
			  	};
			// Agrega Compra
	     		$scope.AddCompra = function(compra){
	     			if (!form_compra.$invalid) {
			  	 		$scope.compra = compra;
			  	 	}
			  	};
			// Laboratorio
			  	$scope.buscarLaboratorio = function(txt){
			  		$scope.results = [];
			  		if (txt != "") {
				  		Api.get('busquedalaboratorio/'+ txt).then(function(data){
				  			$scope.lresults = data;
				  		});
			  		}else{
				  		$scope.detalle.producto_id = "";
			  		};
			  	};
			  	$scope.selectLaboratorio = function(result){
			  		$scope.detalle.laboratorio_id = result.id;
			  		$scope.txtlaboratorio = result.nombre;
			  		$scope.lresults = [];
			  	};
			// Producto
			  	$scope.buscarProducto = function(txt){
			  		$scope.results = [];
			  		if (txt != "") {
				  		Api.get('busquedaproducto/'+ txt).then(function(data){
				  			if (data.length > 0) {
				  			$scope.presults = data;
				  		};
				  		});
				  	}else{
				  		$scope.detalle.producto_id = "";
			  		};
			  	};
			  	$scope.selectProducto = function(result){
			  		$scope.detalle.producto_id = result.id;
			  		$scope.detalle.producto = result.nombre;
			  		$scope.detalle.precio = result.precio;
			  		$scope.txtproducto = result.nombre;
			  		$scope.presults = [];
			  	};
			// Agrega Detalle
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {
	     				$scope.total = $scope.total + (detalle.precio * detalle.cantidad);
			  	 		$scope.detalles.push(detalle);
			  	 		$scope.detalle = {};
			  	 		$scope.detalle.laboratorio_id = detalle.laboratorio_id;
			  	 		$scope.detalle.cantidad = detalle.cantidad;
			  	 		$scope.txtproducto = "";
			  	 	}
			  	};
			// Elimina detalle
			  	$scope.eliminar = function(id){
			  		$log.info(id);
			  		$scope.detalles.splice(id, 1);
			  	};
			// Guardar
			  	$scope.Ok = function(){
			  	if ($scope.detalles.length > 0) {
		  	 		$scope.compras.push($scope.compra);
			  		var compraTotal = $scope.compras.concat($scope.detalles);
  		  			Api.post('compras/guardar', compraTotal).then(function(data){
				  		$scope.view = !$scope.view;
  						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				  		$scope.iniciar();
				  		$log.info(data);
				  		$scope.ingresados.push(data);
				  		$scope.compra.proveedor_id = data.proveedor_id;
				  		$scope.compra.proveedor = data.proveedor;
  		  			},
  						function (data){
  							$scope.alertas = data;
  						}
  		  			);
  		  		}else{ $scope.alertas = [{'type' 	: 'warning', 'msg'	: 'No hay productos ingresados!'}]};		  	 		  				
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close($scope.ingresados);
				};

			}
	    });

	    modalInstance.result.then(function (compras) {
	    	for (var i = 0; i <= compras.length - 1; i++) {
	    		$scope.compras.unshift(compras[i]);
	    	};
	    });
	};

	$scope.modalDetalle = function (compra) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/compras/listacompra.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, $log, compra) {
	     		$scope.compra = compra;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('compras/detalles/' + compra.id).then(function(data){
     				$scope.detalles = data;
     			});

     		    $scope.sumar = function(v){
     		    	$scope.total = $scope.total + v;
     		    };
	     		$scope.Cancelar = function(){
			  	 	$modalInstance.dismiss('cancelar');
			  	};
			  	$scope.Imprimir = function(){
			  	 	$log.info('imprimir');
			  	};
			},
			resolve: {
		        compra: function () {
		          return compra;
		        }
		    }
	    });
	};

})

.controller('SucursalesCtrl', function (Api, $scope, $modal, $log){
	$scope.sucursales = [];
	$scope.alertas = [];

	$scope.cargarDatos = function(){
	    Api.get('sucursales/ver').then(function(data){
			$scope.sucursales = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance) {
	     		var sucursales = [];
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
	     				Api.post('sucursales/guardar', sucursal).then(function(data){
						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
						sucursales.push(sucursal);
						$scope.sucursal = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);		
			  	 	};
			  	};
			  	$scope.Cancelar = function () {
			  	 	$modalInstance.close(sucursales);
				};
			}
	    });

	    modalInstance.result.then(function (sucursales) {
  			for (var i = 0; i <= sucursales.length - 1; i++) {
	    		$scope.sucursales.unshift(sucursales[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (sucursal_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, sucursal) {
	     		$scope.sucursal = sucursal;
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[sucursal.departamento_id - 1];
	     			$scope.municipios = [{'id':sucursal.municipio_id,'nombre':sucursal.municipio}];
	     			$scope.muni = $scope.municipios[0];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
	     				Api.post('sucursales/guardar', sucursal).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
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
		        sucursal: function () {
		          return sucursal_id;
		        }
		    }
	    });
	};

})

.controller('VentasCtrl', function (Api, $scope, $modal, $log){
	$scope.ventas = [];
	$scope.alertas = []

	$scope.cargarDatos = function () {
    	Api.get('ventas/ver').then(function(data){
			$scope.ventas = data;
		});
	};

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

.controller('UsuariosCtrl', function (Api, $scope, $log, $modal){
	$scope.usuarios = [];
	$scope.usuario = {};
	$scope.alertas = [];

    $scope.cargarDatos = function () {
	    Api.get('f_usuarios/ver').then(function(data){
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
	     		$scope.tipos = [{'id':'2','nombre':'Farmacia'},{'id':'3','nombre':'Sucursal'}];
	     		$scope.c_sucursales = function(id){
	     			if(id==3){
	     				Api.get('f_usuarios/sucursales').then(function(data){
							$scope.sucursales = data;
						});
	     			}
	     			else{
	     				$scope.sucursales = [];
	     				$scope.usuario.sucursal_id = 0;
	     			}
		     		
	     		};
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
	     				$log.info(usuario);
			  			Api.post('f_usuarios/guardar', usuario).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
							usuarios.push(usuario);
							$scope.usuario = {};
							$scope.sucursales = [];
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

.controller('FarmaciaCtrl', function (Api, $scope, $log, $modal){
	$scope.farmacia = [];
	$scope.alertas = [];

    Api.get('farmacias/farmacia').then(function(data){
		$scope.farmacia = data[0];
	});
	
    Api.get('departamentos').then(function(data){
		$scope.departamentos = data;
		$scope.dep = $scope.departamentos[$scope.farmacia.departamento_id - 1];
		$scope.municipios = [{'id':$scope.farmacia.municipio_id,'nombre':$scope.farmacia.municipio}];
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
			},
			function (data){
				$scope.alertas = data;
			}
			);	
	 	}
	};

})

.controller('LaboratoriosCtrl', function (Api, $scope, $log, $modal){
	$scope.Laboratorios = [];
	$scope.alertas = [];

	$scope.cargarDatos = function(){
	    Api.get('Laboratorios/ver').then(function(data){
			$scope.Laboratorios = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/Laboratorios/form.html',
	      	windowClass:'mini',
	     	controller:  function ($scope, $modalInstance) {
	     		var Laboratorios = [];
	     		$scope.Ok = function(laboratorio){
	     			if (!formulario.$invalid) {
	     				Api.post('Laboratorios/guardar', laboratorio).then(function(data){
						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
						Laboratorios.push(laboratorio);
						$scope.laboratorio = {};
			  			},
							function (data){
								$scope.alertas = data;
							}
			  			);		
			  	 	};
			  	};
			  	$scope.Cancelar = function () {
			  	 	$modalInstance.close(Laboratorios);
				};
			}
	    });

	    modalInstance.result.then(function (Laboratorios) {
  			for (var i = 0; i <= Laboratorios.length - 1; i++) {
	    		$scope.Laboratorios.unshift(Laboratorios[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (laboratorio_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/Laboratorios/form.html',
	      	windowClass:'mini',
	     	controller:  function ($scope, $modalInstance, laboratorio) {
	     		$scope.laboratorio = laboratorio;
	     		$scope.Ok = function(laboratorio){
	     			if (!formulario.$invalid) {
	     				Api.post('Laboratorios/guardar', laboratorio).then(function(data){
							$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
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
		        laboratorio: function () {
		          return laboratorio_id;
		        }
		    }
	    });
	};
    
});