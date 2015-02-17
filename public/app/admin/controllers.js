'use strict';

angular.module('farmaciaControllers', [])

.controller('DashboardCtrl', function (Api, $scope, $log) {
	$scope.datos = {};

	Api.get('dashboard/admin').then(function(data){
		$scope.datos = data[0];
	});

})

.controller('ProductosCtrl', function (Api, Library, $scope, $log, $modal){

	$scope.productos = [];

	// Cargando los productos
		$scope.cargarDatos = function () {
			$log.info('Cargando...');
	    	Api.get('productos/ver').then(function(data){
				$scope.productos = data;
			});
		};

	// Muestra el formulario para crear productos.
		$scope.modalcrear = function (productos) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/productos/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, Library, productos) {
		     		$scope.productos = productos;
		     	// Cargar Categorias
		     		Api.get('categorias').then(function(data){
		     			$scope.categorias = data;
		     		});
		     	// Buscar Subcategorias
		     		$scope.buscar_subcat = function(id){
		     			Api.get('subcategorias/'+ id).then(function(data){
		     				$scope.subcategorias = data;
		     			});
		     		};
		     	// Guardar producto
		     		$scope.Ok = function(producto){
		     			if (!formulario.$invalid) {
		     				if (Library.guardar('productos/guardar', producto))
		     					add(producto);
				  	 	}
				  	};
				// Agregamos el producto
				  	function add(producto){
				  		$scope.productos.unshift(producto);
						$scope.producto = {};
						$scope.subcat = {};
						$scope.cat = {};
				  	}
				// Salir o cancelar
				  	$scope.Cancelar = function () {
					    $modalInstance.close();
					};
				},
				resolve: {
			        productos: function () {
			          return $scope.productos;
			        }
			    }
		    });
		};
	// Muestra el formulario para modificar productos.
		$scope.modalactualizar = function (producto) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/productos_admin/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, producto) {
		     		$scope.producto = producto;
		     	// Carga categorias
		     		Api.get('categorias').then(function(data){
		     			$scope.categorias = data;
		     			$scope.cat = $scope.categorias[producto.categoria_id-1];
		     		});
		     	// Carga Subcategoria
		     		Api.get('subcategorias/0').then(function(data){
		     			$scope.subcategorias = data;
		     			$scope.subcat = $scope.subcategorias[producto.subcategoria_id-1];
		     		});
		     	// Busca subcategoria
		     		$scope.buscar_subcat = function(id){
		     			Api.get('subcategorias/'+ id).then(function(data){
		     				$scope.subcategorias = data;
		     			});
		     		};
		     	// Guarda el producto
		     		$scope.Ok = function(producto){
		     			if (!formulario.$invalid) {
				  	 		Library.guardar('productos/guardar', producto);
				  	 	}
				  	};
				// Salir o cancelar
				  	$scope.Cancelar = function () {
					    $modalInstance.dismiss('cancelar');
					};
				},
				resolve: {
			        producto: function () {
			          return producto;
			        }
			    }
		    });
		};
	// Eliminar un producto
		$scope.eliminar = function(producto){
			if (confirm('¿Desea eliminar el Registro?')) {
				if (Library.eliminar('productos/eliminar/'+ producto.id))
					pop(producto.id);		
			}
			function pop(id){
				for (var i in $scope.productos ) {
					if ($scope.productos[i].id === id ){
						$scope.productos.splice(i, 1);
					}	
				}
			}
		};

})

.controller('FarmaciasCtrl', function (Api, Library, $scope, $log, $modal){
	$scope.farmacias = [];

	// Cargar farmacias
		$scope.cargarDatos = function () {
			$log.info('Cargando..');
		    Api.get('farmacias/ver').then(function(data){
				$scope.farmacias = data;
			});
		};

	// Muestra el formulario para crear farmacias.
		$scope.modalcrear = function (farmacias) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/farmacias/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, Api, Library, farmacias) {
		     		$scope.farmacias = farmacias;
		     		$scope.farmacia = {};
		     		$scope.farmacia.activa = 1;

		     	// Buscar departamentos
		     		Api.get('departamentos').then(function(data){
		     			$scope.departamentos = data;
		     		});
		     	// Buscar Municipios
		     		$scope.buscar_muni = function(id){
		     			Api.get('municipios/'+ id).then(function(data){
		     				$scope.municipios = data;
		     			});
		     		};
		     	// Guardar farmacia
		     		$scope.Ok = function(farmacia){
		     			if (!formulario.$invalid) {
				  			if(Library.guardar('farmacias/guardar', farmacia))
				  				add(farmacia);
				  	 	}
				  	};
				// Agregar farmacia
					function add(farmacia){
						$scope.farmacias.unshift(farmacia);
						$scope.farmacia = {};
						$scope.municipios = [];
						$scope.departamentos = [];
					};
				  	$scope.Cancelar = function () {
					   $modalInstance.close();
					};
				},
				resolve: {
			        farmacias: function () {
			          return $scope.farmacias;
			        }
			    }
		    });
		};

	// Muestra el formulario para modificar farmacia.
		$scope.modalactualizar = function (farmacia) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/farmacias/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance, farmacia, Library) {
		     		$scope.farmacia = farmacia;
		     	// Cargando departamentos
		     		Api.get('departamentos').then(function(data){
		     			$scope.departamentos = data;
		     			$scope.dep = $scope.departamentos[farmacia.departamento_id-1];
		     		});
		     	// Cargando Municipios
		     		Api.get('municipios/0').then(function(data){
		     			$scope.municipios = data;
		     			$scope.muni = $scope.municipios[farmacia.municipio_id-1];
		     		});
		     		$scope.buscar_muni = function(id){
		     			Api.get('municipios/'+ id).then(function(data){
		     				$scope.municipios = data;
		     			});
		     		};
		     		$scope.Ok = function(farmacia){
		     			if (!formulario.$invalid) {
				  	 		Library.guardar('farmacias/guardar', farmacia);  	 					
				  	 	}
				  	};
				  	$scope.Cancelar = function () {
					    $modalInstance.dismiss('cancelar');
					};
				},
				resolve: {
			        farmacia: function () {
			          return farmacia;
			        }
			    }
		    });
		};

	// Eliminar un farmacia
		$scope.eliminar = function(farmacia){
			if (confirm('¿Desea eliminar el Registro?')) {
				if (Library.eliminar('farmacias/eliminar/'+ farmacia.id))
					pop(farmacia.id);		
			}
			function pop(id){
				for (var i in $scope.farmacias ) {
					if ($scope.farmacias[i].id === id ){
						$scope.farmacias.splice(i, 1);
					}	
				}
			}
		};
})

.controller('UsuariosCtrl', function (Api, $scope, $log, $modal){
	$scope.usuarios = [];

	// Cargar usuarios
	    $scope.cargarDatos = function () {
	    	$log.info('Cargando..');
		    Api.get('usuarios/ver').then(function(data){
				$scope.usuarios = data;
			});
		};

	// Muestra el formulario para crear usuarios.
		$scope.modalcrear = function (usuarios) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/usuarios/form.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
		     	controller:  function ($scope, $modalInstance,$log,usuarios, Library) {
		     		$scope.usuarios = usuarios;
		     		$scope.usuario = {};
		     		$scope.tipos = [{'id':'1','nombre':'Admon'},{'id':'2','nombre':'Farmacia'}];
		     		$scope.usuario.activa = 1;
		     	// Cargar farmacias
		     		$scope.bfarmacias = function(id){
		     			if(id==2){
		     				Api.get('farmacias/ver').then(function(data){
								$scope.farmacias = data;
							});
		     			} else{$scope.farmacias = [];$scope.usuario.sucursal_id="";}
		     		};
		     	// Guardar usuario
		     		$scope.Ok = function(usuario){
		     		$log.info(usuario);
		     			if (!formulario.$invalid) {
				  			if(Library.guardar('a_usuarios/guardar', usuario))
				  				add(usuario);
				  	 	}
				  	};
				// Agregar
					function add(usuario){
						$scope.usuarios.unshift(usuario);
						$scope.usuario = {};
						$scope.farmacias = [];
						$scope.usuario.activa = 1;
					};
				  	$scope.Cancelar = function () {
					   $modalInstance.close();
					};
				},
				resolve: {
			        usuarios: function () {
			          return $scope.usuarios;
			        }
			    }
		    });
		};

		$scope.modalactualizar = function (usuario_id) {
		    var modalInstance = $modal.open({
		      	templateUrl: 'app/views/admin/usuarios_admin/form_admin.html',
		      	windowClass: 'normal',
		      	backdrop : 'static',
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

	$scope.cargarDatos = function () {
	    Api.get('categorias/ver').then(function(data){
			$scope.categorias = data;
		});
	};

	$scope.modalcrear = function () {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/admin/categorias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, Api) {
	     		var categorias = [];
	     		$scope.Ok = function(categoria){
	     			$log.info(categoria);
	     			if (!formulario.$invalid) {
	     				$.growl('Guardando...', {type: 'info'});
			  			Api.post('categorias/guardar', categoria).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
							categorias.push(categoria);
							$scope.categoria = {};
			  			},
							function (data){
								$.growl('Error: ' + data, {type: 'warning'});
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
  			for (var i = 0; i <= categorias.length - 1; i++) {
	    		$scope.categorias.unshift(categorias[i]);
	    	};
	    });
	};

	$scope.modalactualizar = function (categoria_id) {
	    var modalInstance = $modal.open({
	      	templateUrl: 'app/views/admin/categorias/form.html',
	      	windowClass: 'normal',
	      	backdrop : 'static',
	     	controller:  function ($scope, $modalInstance, categoria, $log) {
	     		$scope.categoria = categoria;
	     		$scope.Ok = function(categoria){
	     			if (!formulario.$invalid) {
	     				// Saber si es categoria o subcategoria
	     				var sub = '';
	     				if (categoria['categoria_id']) {
	     					sub = 'sub';
	     				}else{sub = '';};

	     				$.growl('Guardando...', {type: 'info'});
			  	 		Api.post('categorias/guardar' + sub, categoria).then(function(data){
							$.growl('Proceso Exitoso', {type: 'success'});
  	 		  			},
  	 						function (data){
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
		        categoria: function () {
		          return categoria_id;
		        }
		    }
	    });
	};

});