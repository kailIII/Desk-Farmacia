<?php

class ApiController extends BaseController{

	function getUsuario($id){
		$usuario = V_Usuario::find($id);
		return Response::json($usuario, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}


    public function postActualizar()
    {
        $data = Input::all();

        if (!Input::has('password'))
        	$data['password'] = Auth::user()->password;
        if (!Input::has('password_confirmation'))
        	$data['password_confirmation'] = Auth::user()->password;

        $usuario = User::find(Input::get('id'));

        
        if($usuario->guardar($data)){
        	unset($data['password']);
        	unset($data['password_confirmation']);
            return Response::json($data, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
        }

        
        $errores = "";
        foreach ($usuario->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }

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

	function getBusquedaproveedor($txt){

		$proveedores = Proveedor::where('nombre','LIKE', $txt."%")->orderBy('nombre','asc') ->take(10)->get();

		return Response::json($proveedores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getBusquedapf($txt){

		$farmacia = Auth::user()->farmacia->id;

		$productos = V_ProductosFarmacia::where('farmacia_id', $farmacia)
									  ->where('nombre','LIKE', $txt."%")->orderBy('nombre','asc')->take(10)->get();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getBusquedaps($txt){

		$sucursal = Auth::user()->sucursal->id;

		$productos = V_ProductosSucursal::where('sucursal_id', $sucursal)
									  ->where('nombre','LIKE', $txt."%")->orderBy('nombre','asc') ->take(10)->get();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getBusquedalaboratorio($txt){

		$farmacia = Auth::user()->farmacia->id;

		$productos = Laboratorio::where('farmacia_id', $farmacia)
									  ->where('nombre','LIKE', $txt."%")->orderBy('nombre','asc') ->take(10)->get();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

	function getAddproductos(){

		// $farmacia = Auth::user()->farmacia->id;

		// $productos = V_AddProductos::where('farmacia_id', $farmacia)->get();

		$productos = V_AddProductos::all();

		return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
	}

}