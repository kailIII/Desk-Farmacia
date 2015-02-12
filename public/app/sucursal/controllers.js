'use strict';

angular.module('farmaciaControllers', [])

.controller('MainCtrl', function (Api, $scope, $log, $modal) {
	// Manejar el titulo
		$scope.titulo = "Dashboard";
		$scope.header = function(l){
			$scope.titulo = l;
		};
	// Buscador
		// $scope.buscar = function(q){
		// 	$log.info(q);
		// };
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
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, $modal, usuario) {
	     		$scope.usuario = usuario;
	     		$scope.imagenes = [{'nombre':'avatar_1.png'},{'nombre':'avatar_2.png'},{'nombre':'avatar_3.png'},{'nombre':'avatar_4.png'},{'nombre':'avatar_5.png'}];
				$scope.select = function(img){
					$scope.usuario.avatar = img.nombre;
				};
	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
			  			Api.post('actualizar', usuario).then(function(data){
							$.growl("Proceso Exitoso", "success");
							$scope.usuario = data;
			  			},
							function (data){
							$.growl("Error: "+ data, "error");
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

})

.controller('DashboardCtrl', function (Api, $scope, $log, $modal) {

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
    	Api.get('s_productos/ver').then(function(data){
			$scope.productos = data;
		});
    };

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/productos_sucursal/form.html',
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

.controller('VentasCtrl', function (Api, $scope, $modal, $log){
	$scope.ventas = [];
	$scope.alertas = []

	$scope.cargarDatos = function(){
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
	     		var d = new Date();
	     		$scope.ingresados = [];
	     	// Inicializar variables
	     		$scope.iniciar = function(){
	     			$scope.venta = {};
	     			$scope.ventas = [];
		     		$scope.venta.fecha = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		     		$scope.venta.factura = "123-321-2";
		     		$scope.venta.cliente_id = 1;
		     		$scope.txtcliente = "Normal";
	     			$scope.view = false;
		     		$scope.btnclass = ['default','default','default'];
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.total = 0;
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.detalle.cantidad = 1;
	     		};
	     	// Agregar venta
	     		$scope.AddVenta = function(venta){
	     			if (!form_venta.$invalid) {
			  	 		$scope.venta = venta;
			  	 		$scope.view = true;
			  	 		switch(venta.tipo_factura_id){
			  	 			case 1:
			  	 				$scope.btnclass = ['primary','default','default'];
			  	 				break;
			  	 			case 2:
			  	 				$scope.btnclass = ['default','primary','default'];
			  	 				break;
			  	 			case 3:
			  	 				$scope.btnclass = ['default','default','primary'];
			  	 				break;
			  	 		}
			  	 	}
			  	};
			// Buscar Producto
			  	$scope.buscarProducto = function(txt){
			  		$scope.results = [];
			  		$scope.detalle.producto_sucursal_id = "";
			  		if (txt != "") {
			  		Api.get('busquedaps/'+ txt).then(function(data){
			  			if (data.length > 0) {
			  				$scope.results = data;
			  			};
			  		});
			  		};
			  	};
			  	$scope.selectProducto = function(result){
			  		$scope.detalle.producto_sucursal_id = result.id;
			  		$scope.txtproducto = result.nombre;
			  		$scope.detalle.producto = result.nombre;
			  		$scope.detalle.precio = result.precio;
			  		$scope.results = [];
			  	};
			// Agregar detalle
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {

	     				if (!form_detalle.$invalid) {
	     				//Verifica si el producto ya fue ingresado para aumentar cantidad.
	     				if ($scope.detalles.length > 0) {
		     				for (var i = 0; i <= $scope.detalles.length - 1; i++) {
		     					if ($scope.detalles[i].producto_sucursal_id == detalle.producto_sucursal_id) {
		     						$scope.detalles[i].cantidad = $scope.detalles[i].cantidad + 1;
				     			}
				     			else{
				     				$scope.detalles.push(detalle);
			     				};
		     				};
		     			}
		     			else{
		     				$scope.detalles.push(detalle);
	     				};
	     				//Inicializar variables
	     				$scope.total = $scope.total + (detalle.precio * detalle.cantidad);
			  	 		$scope.detalle = {};
			  	 		$scope.detalle.laboratorio_id = detalle.laboratorio_id;
			  	 		$scope.detalle.cantidad = 1;
			  	 		$scope.txtproducto = "";
			  	 		};
			  	 	}
			  	};
			// Elimiar
			  	$scope.eliminar = function(id){
			  		$log.info(id);
			  		$scope.detalles.splice(id, 1);
			  	};
			// Cliente
			  	$scope.buscarCliente = function(txtcliente){
			  		$scope.resultsc = [];
			  		Api.get('busquedacliente/'+ txtcliente).then(function(data){
			  			$scope.resultsc = data;
			  			$scope.venta.cliente_id = "";
			  		});
			  	};
			  	$scope.selectCliente = function(result){
			  		$scope.venta.cliente_id = result.id;
			  		$scope.txtcliente = result.nombre;
			  		$scope.resultsc = [];
			  	};
			// Guardar Venta
			  	$scope.Ok = function(){
			  	if ($scope.detalles.length > 0) {
			  		$scope.ventas = [];
			  		$scope.ventas.push($scope.venta);
			  		var ventaTotal = $scope.ventas.concat($scope.detalles);
			  		$log.info(ventaTotal);
  		  			Api.post('ventas/guardar', ventaTotal).then(function(data){
  						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
				  		$scope.ingresados.push(data);
				  		$scope.iniciar();
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

	    modalInstance.result.then(function (ventas) {
	    	for (var i =0 ; i <= ventas.length - 1; i++) {
	    		$scope.ventas.unshift(ventas[i]);
	    	};
	    });
	};

	$scope.modalDetalle = function (venta) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/ventas/listaventa.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, $log, venta) {
	     		$scope.venta = venta;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('ventas/detalles/' + venta.id).then(function(data){
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
		        venta: function () {
		          return venta;
		        }
		    }
	    });
	};

})

.controller('RequisicionesCtrl', function (Api, $scope, $modal, $log){
	$scope.requisiciones = [];

	// Msjs
	$scope.cargarMsj = function(){
	    Api.get('requisiciones/estado/Enviado').then(function(data){
			$scope.msjs = data;
		});
	};

	$scope.cargarDatos = function(){
	    Api.get('requisiciones/ver').then(function(data){
			$scope.requisiciones = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/requisiciones/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance) {
	     		var agregados = [];
	     		var d = new Date();

	     		iniciar();

	     		function iniciar(){
		     		$scope.requisicion = {};
		     		$scope.detalles = [];
		     		$scope.detalle = {};
		     		$scope.detalle.cantidad = 1;
		     		$scope.f = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		     		$scope.ver = false;
	     		};
 				
 				Api.get('requisiciones/sucursales').then(function(data){
					$scope.sucursales = data;
				});

			// Agregar requisicion
				$scope.guardarRequisicion = function(f,s){
					$scope.requisicion.fecha = f;
					$scope.requisicion.sucursal2_id = s.id;
					$scope.requisicion.sucursal2 = s.nombre;
					$scope.ver = !$scope.ver;
					$log.info($scope.requisicion);
				};

 			// Buscar Producto
			  	$scope.buscarProducto = function(txt){
			  		$scope.results = [];
			  		$scope.detalle.producto_id = "";
			  		if (txt != "") {
			  		Api.get('busquedaps/'+ txt).then(function(data){
			  			if (data.length > 0) {
			  				$scope.results = data;
			  			};
			  		});
			  		};
			  	};
			  	$scope.selectProducto = function(result){
			  		$scope.detalle.producto_id = result.id;
			  		$scope.txtproducto = result.nombre;
			  		$scope.detalle.producto = result.nombre;
			  		$scope.results = [];
			  	};

			// Agregar detale
				$scope.guardarDetalle = function(detalle){
					$scope.detalles.push(detalle);
					$scope.detalle = {};
					$scope.txtproducto = "";
					$scope.detalle.cantidad = 1;
					$scope.detalle.producto_id = "";
				};

			// Guardar
	     		$scope.Ok = function(){
     				$scope.requisiciones = [];
     				$scope.requisiciones.push($scope.requisicion);
     				var total = $scope.requisiciones.concat($scope.detalles);
     				$log.info(total);
		  	 		Api.post('requisiciones/guardar', total).then(function(data){
						$scope.alertas = [{'type' 	: 'success', 'msg'	: 'Proceso Exitoso!!!'}];
						agregados.push($scope.requisicion);
						iniciar();
		  			},
						function (data){
							$scope.alertas = data;
						}
		  			);	
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close(agregados);
				};
			}
	    });

	    modalInstance.result.then(function (requisiciones) {
  			for (var i = 0; i <= requisiciones.length - 1; i++) {
	    		$scope.requisiciones.unshift(requisiciones[i]);
	    	};	  	 
	    });
	};

	$scope.modalDetalle = function (requisicion) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/requisiciones/listarequisiciones.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, $log, requisicion) {
	     		$scope.requisicion = requisicion;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('requisiciones/detalles/' + requisicion.id).then(function(data){
     				$scope.detalles = data;
     			});

	     		$scope.Cancelar = function(){
			  	 	$modalInstance.dismiss('cancelar');
			  	};
			  	$scope.Imprimir = function(){
			  	 	$log.info('imprimir');
			  	};
			},
			resolve: {
		        requisicion: function () {
		          return requisicion;
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
	    Api.get('s_usuarios/ver').then(function(data){
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
	     		$scope.tipos = [{'id':'3','nombre':'Sucursal'},{'id':'4','nombre':'Vendedor'}];

	     		$scope.Ok = function(usuario){
	     			if (!formulario.$invalid) {
	     				$log.info(usuario);
			  			Api.post('s_usuarios/guardar', usuario).then(function(data){
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

.controller('SucursalCtrl', function (Api, $scope, $log, $modal){
	$scope.sucursal = [];
	$scope.alertas = [];

    Api.get('sucursales/sucursal').then(function(data){
		$scope.sucursal = data[0];
	});
	
    Api.get('departamentos').then(function(data){
		$scope.departamentos = data;
		$scope.dep = $scope.departamentos[$scope.sucursal.departamento_id - 1];
		$scope.municipios = [{'id':$scope.sucursal.municipio_id,'nombre':$scope.sucursal.municipio}];
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
				$scope.alertas = data;
			}
			);	
	 	}
	};

});