<?php

class ApiMovilController extends BaseController {

// Farmacia
	public function getFarmacias(){
		
		$farmacias = V_Farmacia::orderBy('nombre', 'asc')->paginate(6);

		return Response::json($farmacias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function getFarmacia($id)
	{
		$farmacias = V_Farmacia::find($id);

		return Response::json( $farmacias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

// Sucursales
	public function getSucursales($id){

		$sucursales = V_Sucursal::where('farmacia_id', '=', $id)->get();

		return Response::json( $sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function getSucursal($id){

		$sucursal = V_Sucursal::find($id);

		return Response::json( $sucursal, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

// Productos
	public function getProductos(){

		$productos = V_Producto::orderby('nombre', 'asc')->paginate(6);

		return Response::json( $productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function getProducto($id)
	{
		$productos = V_Producto::find($id);

		return Response::json( $productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	public function getProductodetalle($id, $dep)
	{
		if ($dep == 0) {
			$productos = V_ProductoDetalle::where('producto_id', $id)
											->orderby('precio', 'asc')->get();
		}
		else{
			$productos = V_ProductoDetalle::where('producto_id', $id)
											->where('departamento_id', $dep)->orderby('precio', 'asc')->get();
		}

		return Response::json( $productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

// Ubicaciones (Municipio, Departamento)
	public function getUbicaciones(){

		$ubicaciones = V_Ubicaciones::all();
	    return Response::json( $ubicaciones, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

// Busqueda de Productos
	public function getBusquedaproductos($valor) {
		
		$productos = V_Producto::where('nombre','LIKE', $valor."%")
	        ->orderBy('nombre','asc')
	        ->take(30)->get();
	    
	    return Response::json( $productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

}