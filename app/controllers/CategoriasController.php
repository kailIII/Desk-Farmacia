<?php

class CategoriasController extends BaseController{


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
        $categorias = Categoria::all();
        return Response::json($categorias, 200);
	}


	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
        $cliente = new Cliente;
        
        return View::make('cliente.form', compact('cliente'));
	}


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//

		$data = Input::all();

		$cliente = new Cliente;

		if($cliente->guardar($data))
			return Response::json($cliente,201);
		$errores = [];
		foreach ($cliente->errores->all() as $error) {
			// foreach ($error[0] as $err) {
			// 	# code...
			// 	$errores = $err;
			// }
			$errores[] = array(
					'type' => "danger",
					'msg'	=> $error
				);
		}
		
		// return Response::json($cliente->errores, 200);
		return Response::json($errores, 200);

	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
		$subcategorias = SubCategoria::where('categoria_id',$id)->get();
		return Response::json($subcategorias, 200);
	}


	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}




}