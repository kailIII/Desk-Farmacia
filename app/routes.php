<?php

// Inicio de Sesion
    // Route::get('login', 'AuthController@get_login');
    Route::get('login', ['as' => 'login'  ,'uses' => 'AuthController@get_login']);
    Route::post('login', 'AuthController@post_login');

// Log In
Route::group(array('before'=>'auth'), function()
{
    // Dashboard Farmacias
        Route::any('/', function() {return View::make('dashboard');});

    // Api
    Route::group(array('prefix' => 'api'), function() {
        // Admin
        Route::group(['before' => 'is_admin'], function()
        {
        Route::get('dashboard/admin', 'dashboardController@admin');
        Route::controller('productos', 'ProductoController');
        Route::controller('farmacias','FarmaciaController');
        Route::controller('usuarios','UserController');
        Route::controller('categorias','CategoriaController');
        });
        // Farmacia
        Route::group(['before' => 'is_farmacia'], function()
        {
        Route::get('dashboard/farmacia', 'dashboardController@farmacia');
        Route::controller('f_productos', 'FProductoController');
        Route::controller('f_sucursales','FSucursalesController');
        Route::controller('f_clientes','ClienteController');
        Route::controller('f_proveedores','FProveedorController');
        Route::controller('f_compras','FCompraController');
        Route::controller('f_laboratorios','FLaboratorioController');
        Route::controller('f_usuarios','FUserController');
        Route::controller('f_ventas','FVentaController');
        Route::controller('f_requisiciones','FRequisicionController');
        Route::controller('f_farmacias','FFarmaciaController');
        });
        // Sucursal
        Route::group(['before' => 'is_sucursal'], function()
        {
        Route::get('dashboard/farmacia', 'dashboardController@sucursal');
        Route::controller('s_usuarios','SUserController');
        Route::controller('s_productos', 'SProductoController');
        Route::controller('s_clientes','clienteController');
        Route::controller('s_ventas','SVentaController');
        Route::controller('s_requisiciones','SRequisicionController');
        Route::controller('s_sucursales','SSucursalesController');
        });
        Route::controller('','ApiController');

    });
	// Lock
	Route::get('/bloqueado', ['as' => 'lock'  ,'uses' => 'AuthController@get_lock']);
	Route::post('/bloqueado', 'AuthController@post_lock');
    // Log out
    Route::get('/logout', ['as' => 'logout', 'uses' => 'AuthController@get_logOut']);
});

// Versión Movil
    Route::group(['prefix' => 'app'], function(){ Route::controller('', 'ApiMovilController');} );

// Cualquier Ruta
    Route::any('{path?}', function($path) { return Redirect::to('/'); });
