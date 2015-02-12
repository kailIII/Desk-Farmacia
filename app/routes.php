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
        Route::controller('a_usuarios','UserController');
        Route::controller('categorias','CategoriaController');
        });
        // Farmacia
        Route::group(['before' => 'is_farmacia'], function()
        {
        Route::get('dashboard/farmacia', 'dashboardController@farmacia');
        Route::controller('f_productos', 'FProductoController');
        Route::controller('sucursales','SucursalesController');
        Route::controller('clientes','clienteController');
        Route::controller('proveedores','ProveedorController');
        Route::controller('compras','CompraController');
        Route::controller('laboratorios','LaboratorioController');
        Route::controller('f_usuarios','FUserController');
        Route::controller('ventas','VentaController');
        // Route::controller('requisiciones','RequisicionController');
        });
        // Sucursal
        Route::group(['before' => 'is_sucursal'], function()
        {
        Route::get('dashboard/farmacia', 'dashboardController@sucursal');
        Route::controller('s_usuarios','SUserController');
        Route::controller('s_productos', 'SProductoController');
        Route::controller('clientes','clienteController');
        Route::controller('ventas','VentaController');
        Route::controller('requisiciones','RequisicionController');
        Route::controller('sucursales','SucursalesController');
        });
        Route::controller('','ApiController');

    });


    // Log out
    Route::get('/logout', 'AuthController@get_logOut');
});

// Versión Movil
    Route::group(['prefix' => 'app'], function(){ Route::controller('', 'ApiMovilController');} );

// Cualquier Ruta
    Route::any('{path?}', function($path) { return Redirect::to('/'); });
