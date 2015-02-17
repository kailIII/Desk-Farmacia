<?php

class CategoriaController extends BaseController{


	public function getVer()
	{
        $categorias = Categoria::orderBy('id','dsc')->get();;

		foreach ($categorias as $categoria) {
        	$subcategoria = SubCategoria::where('categoria_id', $categoria->id)->get();
        	$categoria['subcategorias'] = $subcategoria;
		}

        return Response::json($categorias, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

	public function postGuardar()
	{
        $data = Input::all();

        if(Input::has('id'))
            $categoria = Categoria::find(Input::get('id'));
        else
            $categoria = new Categoria;
        
        if($categoria->guardar($data))
          	return Response::json($categoria, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($categoria->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

	public function postGuardarsub()
	{
        $data = Input::all();

        if(Input::has('id'))
            $categoria = SubCategoria::find(Input::get('id'));
        else
            $categoria = new SubCategoria;
        
        if($categoria->guardar($data))
          	return Response::json($categoria, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = "";
        foreach ($categoria->errores->all() as $error) {
            $errores .= "<br>" . $error;
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

	}

}