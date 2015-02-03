<?php

class ApiController extends BaseController{

	function getDepartamentos(){
		$departamentos = Departamento::all();
		return Response::json($departamentos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getMunicipios($id){

		if ($id == "0")
			$municipios = Municipio::all();
		else
			$municipios = Municipio::where('departamento_id', $id)->get();

		return Response::json($municipios, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getMunicipio($id){

		$municipio = Municipio::find($id);

		return Response::json($municipio, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getCategorias(){
		$Categorias = Categoria::all();
		return Response::json($Categorias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getSubcategorias($id){

		if ($id == "0")
			$Subcategorias = Subcategoria::all();
		else
			$Subcategorias = Subcategoria::where('categoria_id', $id)->get();

		return Response::json($Subcategorias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getSubcategoria($id){

		$Subcategoria = SubCategoria::find($id);

		return Response::json($Subcategoria, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getBusquedacliente($txt){

		$clientes = Cliente::where('nombre','LIKE', $txt."%")->orderBy('nombre','asc') ->take(10)->get();

		return Response::json($clientes, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getBusquedaproducto($txt){

		$sucursal = Auth::user()->sucursal->id;

		$productos = V_ProductosFarmacia::where('sucursal_id', $sucursal)
									  ->where('nombre','LIKE', $txt."%")->orderBy('nombre','asc') ->take(10)->get();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

}