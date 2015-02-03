<?php

// Inicio de Sesion
    Route::get('login', 'AuthController@get_login');
    Route::post('login', 'AuthController@post_login');

// Log In
Route::group(array('before'=>'auth'), function()
{
    // Dashboard Farmacias
        Route::any('/', function() {return View::make('dashboard');});

    // Api
    Route::group(array('prefix' => 'api'), function() {
        
        Route::controller('productos', 'ProductoController');
        Route::controller('farmacias','FarmaciaController');
        Route::controller('sucursales','SucursalesController');
        Route::controller('clientes','clienteController');
        Route::controller('proveedores','ProveedorController');
        Route::controller('compras','CompraController');
        Route::controller('ventas','VentaController');
        Route::controller('requisiciones','RequisicionController');

        Route::controller('','ApiController');

    });


    // Log out
    Route::get('/logout', 'AuthController@get_logOut');
});

// Versión Movil
    Route::group(['prefix' => 'app'], function(){ Route::controller('', 'ApiMovilController');} );

// Cualquier Ruta
    Route::any('{path?}', function($path) { return Redirect::to('/'); });
