'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function() {

})

.controller('ProductosCtrl', function (Api, $scope, $log, $modal){

	$scope.productos = [];

	// Saber porductos vencidos
		$scope.vencimiento = function(v){
			if (Date.parse(v) < Date.now())
				return true
			return false
		};
	
	// Cargar productos
		$scope.cargarDatos = function () {
		    Api.get('f_productos/ver').then(function(data){
				$scope.productos = data;
			});
		};

	// Agregar productos
		$scope.modalcrear = function (productos) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/farmacia/productos/form.html',
		      	size: 'lg',
		     	controller:  function ($scope, $modalInstance, $log, productos) {
		     		var selects = [];
		     		$scope.productos = productos;
		     	
		     	// Cargar productos
		     		$scope.cargarProductos = function(){
		     			Api.get('addproductos').then(function(data){
		     				$scope.items = data;
		     			});
		     		}
	     		// Agrega o elimina un productos seleccionado
	     			$scope.select = function (p) {
					 	var idx = selects.indexOf(p);
					 	if (idx > -1) {
					      	selects.splice(idx, 1);
					    }
					    else{
					    	selects.push(p);
					    }
					};
				// Selecciona todos los productos
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
				// Guarda los pruductos
		     		$scope.Ok = function(){
	     				$.growl('Guardando...', {type: 'info'});
	     				for (var i = 0; i <= selects.length - 1; i++) {
	     					Api.post('f_productos/guardar', selects[i]).then(function(data){
	    						$.growl('Proceso Exitoso', {type: 'success'});
	    						$scope.cargarProductos();
								$scope.productos.unshift(data);
	     					}, function (data){
	     						$.growl('Error: ' + data, {type: 'warning'}); 
	     					});
	     				};
				  	};
				  	$scope.Cancelar = function () {
					    $modalInstance.close();
					};
				},
				resolve: {
					productos : function(){
						return $scope.productos;
					}
				}
		    });
		};

})

.controller('ClientesCrtl', function (Api, $scope, $modal, $log){
	$scope.clientes = [];

	// Cardar datos
	$scope.cargarDatos = function(){
	    Api.get('f_clientes/ver').then(function(data){
			$scope.clientes = data;
		});
	};

	// Crear
	$scope.modalcrear = function (clientes) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, clientes) {
	     		$scope.clientes = clientes;
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
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('f_clientes/guardar', cliente).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.clientes.unshift(cliente);
							$scope.cliente = {};
							$scope.municipios = [];
							$scope.departamentos = [];
			  			},
							function (data){
								$.growl('Error: ' + data, {type: 'warning'}); 
							}
			  			);	
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				clientes: function(){
					return $scope.clientes;
				}
			}
	    });
	};

	// Modificar
	$scope.modalactualizar = function (cliente) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/clientes/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, cliente) {
	     		$scope.cliente = cliente;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[cliente.departamento_id-1];
	     		});
	     		Api.get('municipios/0').then(function(data){
	     			$scope.municipios = data;
	     			$scope.muni = $scope.municipios[cliente.municipio_id-1];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(cliente){
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('f_clientes/guardar', cliente).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
  	 		  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'}); 
  	 					});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        cliente: function () {
		          return cliente;
		        }
		    }
	    });
	};

	// Eliminar
	$scope.eliminar = function(cliente){
		if (confirm('¿Desea eliminar el Registro?')) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('f_clientes/eliminar/'+ cliente.id).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				for (var i in $scope.clientes ) {
					if ($scope.clientes[i].id === data.id ){
						$scope.clientes.splice(i, 1);
					}
				}
  			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'}); 
			});
		}
	};

})

.controller('ProveedoresCtrl', function (Api, $scope, $modal, $log){
	$scope.proveedores = [];

	$scope.cargarDatos = function(){
        Api.get('f_proveedores/ver').then(function(data){
    		$scope.proveedores = data;
    	});
	};

	$scope.modalcrear = function (proveedores) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/proveedores/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, proveedores) {
	     		$scope.proveedores = proveedores;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(proveedor){
	     			if (!formulario.$invalid) {
						$.growl('Guardando...', {type: 'info'});
			  			Api.post('f_proveedores/guardar', proveedor).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.proveedores.unshift(proveedor);
							$scope.proveedor = {};
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.close();
				};
			},
			resolve: {
				proveedores: function(){
					return $scope.proveedores;
				}
			}
	    });
	};

	$scope.modalactualizar = function (proveedor) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/proveedores/form.html',
	      	windowClass:'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, proveedor) {
	     		$scope.proveedor = proveedor;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[proveedor.departamento_id-1];
	     		});
	     		Api.get('municipios/0').then(function(data){
	     			$scope.municipios = data;
	     			$scope.muni = $scope.municipios[proveedor.municipio_id-1];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(proveedor){
	     			if (!formulario.$invalid) {
	     				$log.info(proveedor);
  	 					$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('f_proveedores/guardar', proveedor).then(function(data){
  	 		  				$.growl('Proceso Exitoso', {type: 'success'});
  	 		  			}, function (data){
 							$.growl('Error: ' + data, {type: 'warning'});
 						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        proveedor: function () {
		          return proveedor;
		        }
		    }
	    });
	};

	$scope.eliminar = function(proveedor){
		if (confirm('¿Desea eliminar el Registro?')) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('f_proveedores/eliminar/'+ proveedor.id).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				for (var i in $scope.proveedores ) {
					if ($scope.proveedores[i].id === data.id ){
						$scope.proveedores.splice(i, 1);
					}
				}
  			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'}); 
			});
		}
	};
})

.controller('ComprasCtrl', function (Api, $scope, $modal, $log){
	$scope.compras = [];
	$scope.alertas = []
	$scope.compra = {};

    $scope.cargarDatos = function(){
        Api.get('f_compras/ver').then(function(data){
    		$scope.compras = data;
    	});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/compras/form.html',
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
		     		$scope.compra.fecha = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		     		$scope.compra.vencimiento = new Date(d.getFullYear(), d.getMonth(), d.getDate());
		     		$scope.compra.factura = "123-321-2"; //Automatico
		     		//Eliminar
		     			$scope.compra.lote = "123-321-2";
		     			$scope.txtproveedor = "jaja";
		     			$scope.compra.proveedor_id = 1;
		     			$scope.detalle.laboratorio_id = 1;
		     			$scope.txtlaboratorio = "asd";
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
			  		$scope.resultsp = [];
			  		if (txt != "") {
				  		Api.get('busquedapf/'+ txt).then(function(data){
				  			if (data.length > 0) {
				  			$scope.resultsp = data;
				  		};
				  		});
				  	}else{
				  		$scope.detalle.producto_farmacia_id = "";
			  		};
			  	};
			  	$scope.selectProducto = function(result){
			  		$scope.detalle.producto_farmacia_id = result.id;
			  		$scope.detalle.producto = result.nombre;
			  		$scope.detalle.precio = result.precio;
			  		$scope.txtproducto = result.nombre;
			  		$scope.resultsp = [];
			  	};
			// Agrega Detalle
			  	$scope.AddDetalle = function(detalle){
	     			if (!form_detalle.$invalid) {
	     				//Verifica si el producto ya fue ingresado para aumentar cantidad.
	     				if ($scope.detalles.length > 0) {
		     				for (var i = 0; i <= $scope.detalles.length - 1; i++) {
		     					if ($scope.detalles[i].producto_farmacia_id == detalle.producto_farmacia_id) {
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
			  	};
			// Elimina detalle
			  	$scope.eliminar = function(id){
			  		$log.info(id);
			  		$scope.detalles.splice(id, 1);
			  	};
			// Guardar
			  	$scope.Ok = function(){
			  	if ($scope.detalles.length > 0) {
			  		$scope.compras = [];
		  	 		$scope.compras.push($scope.compra);
			  		var compraTotal = $scope.compras.concat($scope.detalles);
  		  			Api.post('f_compras/guardar', compraTotal).then(function(data){
  					$.growl('Guardando...', {type: 'info'});
				  		$scope.view = !$scope.view;
				  		$.growl('Proceso Exitoso', {type: 'success'});
				  		$scope.iniciar();
				  		$log.info(data);
				  		$scope.ingresados.push(data);
				  		$scope.compra.proveedor_id = data.proveedor_id;
				  		$scope.compra.proveedor = data.proveedor;
  		  			},
  						function (data){
  							$.growl('Error: ' + data, {type: 'warning'});
  						}
  		  			);
  		  		}else{ $scope.alertas = [{'type' 	: 'warning', 'msg'	: 'No hay productos ingresados!'}]};		  	 		  				
			  	};
			// Cancelar
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
	      	templateUrl: 'app/views/farmacia/compras/listacompra.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, $log, compra) {
	     		$scope.compra = compra;
	     		$scope.detalles = [];
	     		$scope.total = 0;

     		    Api.get('f_compras/detalles/' + compra.id).then(function(data){
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

.controller('VentasCtrl', function (Api, $scope, $modal, $log){
	$scope.ventas = [];

	$scope.cargarDatos = function () {
    	Api.get('f_ventas/ver').then(function(data){
			$scope.ventas = data;
		});
	};

})

.controller('SucursalesCtrl', function (Api, $scope, $modal, $log){
	$scope.sucursales = [];

	$scope.cargarDatos = function(){
	    Api.get('f_sucursales/ver').then(function(data){
			$scope.sucursales = data;
		});
	};

	$scope.modalcrear = function (sucursales) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, sucursales) {
	     		$scope.sucursales = sucursales;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
						$.growl('Guardando...', {type: 'info'});
	     				Api.post('f_sucursales/guardar', sucursal).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.sucursales.unshift(sucursal);
							$scope.sucursal = {};
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	};
			  	};
			  	$scope.Cancelar = function () {
			  	 	$modalInstance.close();
				};
			},
			resolve: {
				sucursales: function(){
					return $scope.sucursales;
				}
			}
	    });
	};

	$scope.modalactualizar = function (sucursal) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/sucursales/form.html',
	      	size: 'lg',
	     	controller:  function ($scope, $modalInstance, sucursal) {
	     		$scope.sucursal = sucursal;
	     	// Cargar datos
	     		Api.get('departamentos').then(function(data){
	     			$scope.departamentos = data;
	     			$scope.dep = $scope.departamentos[sucursal.departamento_id - 1];
	     		});
	     		Api.get('municipios/0').then(function(data){
	     			$scope.municipios = data;
	     			$scope.muni = $scope.municipios[sucursal.municipio_id-1];
	     		});
	     		$scope.buscar_muni = function(id){
	     			Api.get('municipios/'+ id).then(function(data){
	     				$scope.municipios = data;
	     			});
	     		};
	     	// Guardar
	     		$scope.Ok = function(sucursal){
	     			if (!formulario.$invalid) {
						$.growl('Guardando...', {type: 'info'});
	     				Api.post('f_sucursales/guardar', sucursal).then(function(data){
			  				$.growl('Proceso Exitoso', {type: 'success'});
			  			},
							function (data){
								$log.info(data);
								$.growl('Error: ' + data, {type: 'warning'});
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
		          return sucursal;
		        }
		    }
	    });
	};

	$scope.eliminar = function(sucursal){
		if (confirm('¿Desea eliminar el Registro?')) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('f_sucursales/eliminar/'+ sucursal.id).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				for (var i in $scope.sucursales ) {
					if ($scope.sucursales[i].id === data.id ){
						$scope.sucursales.splice(i, 1);
					}
				}
  			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'}); 
			});
		}
	};

})

.controller('RequisicionesCtrl', function (Api, $scope, $modal, $log){
	$scope.requisiciones = [];
	$scope.alertas = []
	$scope.requicion = {};

    Api.get('f_requisiciones/ver').then(function(data){
		$scope.requisiciones = data;
	});

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
	      	templateUrl: 'app/views/farmacia/usuarios/form.html',
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
	     				$.notify("Guardando...", "Info");
			  			Api.post('f_usuarios/guardar', usuario).then(function(data){
							$.notify("Proceso Exitoso", "success");
							usuarios.push(usuario);
							$scope.usuario = {};
							$scope.sucursales = [];
			  			},
							function (data){
								$.growl('Error: ' + data, {type: 'warning'});
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
			$.growl('Guardando...', {type: 'info'});
  			Api.post('usuarios/guardar', usuario).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				$scope.usuario = {};
  			},
				function (data){
					$.growl('Error: ' + data, {type: 'warning'});
				}
  			);					  	 
	    });
	};
})

.controller('FarmaciaCtrl', function (Api, $scope, $log, $modal){
	$scope.farmacia = {};

	// Cargar datos
	    Api.get('f_farmacias/farmacia').then(function(data){
			$scope.farmacia = data[0];
		});
		
	    Api.get('departamentos').then(function(data){
			$scope.departamentos = data;
			$scope.dep = $scope.departamentos[$scope.farmacia.departamento_id - 1];
		});
		Api.get('municipios/0').then(function(data){
			$scope.municipios = data;
			$scope.muni = $scope.municipios[$scope.farmacia.municipio_id - 1];
		});
		$scope.buscar_muni = function(id){
			Api.get('municipios/'+ id).then(function(data){
				$scope.municipios = data;
			});
		};
	// Guardar
	$scope.Ok = function(farmacia){
		if (!formulario.$invalid) {
		$.growl('Guardando...', {type: 'info'});
			Api.post('f_farmacias/guardar', farmacia).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'});
			});
	 	}
	};

})

.controller('LaboratoriosCtrl', function (Api, $scope, $log, $modal){
	$scope.laboratorios = [];

	$scope.cargarDatos = function(){
	    Api.get('f_laboratorios/ver').then(function(data){
			$scope.laboratorios = data;
		});
	};

	$scope.modalcrear = function (laboratorios) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/laboratorios/form.html',
	      	windowClass:'mini',
	     	controller:  function ($scope, $modalInstance, laboratorios) {
	     		$scope.laboratorios = laboratorios;
	     		$scope.Ok = function(laboratorio){
	     			if (!formulario.$invalid) {
					$.growl('Guardando...', {type: 'info'});
	     				Api.post('f_laboratorios/guardar', laboratorio).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							$scope.laboratorios.unshift(laboratorio);
							$scope.laboratorio = {};
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	};
			  	};
			  	$scope.Cancelar = function () {
			  	 	$modalInstance.close();
				};
			},
			resolve: {
				laboratorios: function(){
					return $scope.laboratorios;
				}
			}
	    });
	};

	$scope.modalactualizar = function (laboratorio) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/farmacia/laboratorios/form.html',
	      	windowClass:'mini',
	     	controller:  function ($scope, $modalInstance, laboratorio) {
	     		$scope.laboratorio = laboratorio;
	     		$scope.Ok = function(laboratorio){
	     			if (!formulario.$invalid) {
						$.growl('Guardando...', {type: 'info'});
	     				Api.post('f_laboratorios/guardar', laboratorio).then(function(data){
			  				$.growl('Proceso Exitoso', {type: 'success'});
			  			}, function (data){
							$.growl('Error: ' + data, {type: 'warning'});
						});
			  	 	}
			  	};
			  	$scope.Cancelar = function () {
				    $modalInstance.dismiss('cancelar');
				};
			},
			resolve: {
		        laboratorio: function () {
		          return laboratorio;
		        }
		    }
	    });
	};

	$scope.eliminar = function(laboratorio){
		if (confirm('¿Desea eliminar el Registro?')) {
			$.growl('Guardando...', {type: 'info'});
			Api.post('f_laboratorios/eliminar/'+ laboratorio.id).then(function(data){
				$.growl('Proceso Exitoso', {type: 'success'});
				for (var i in $scope.laboratorios ) {
					if ($scope.laboratorios[i].id === data.id ){
						$scope.laboratorios.splice(i, 1);
					}
				}
  			}, function (data){
				$.growl('Error: ' + data, {type: 'warning'}); 
			});
		}
	};
    
});