<?php

class ProductoController extends BaseController {

    public function getVer()
    {
        $farmacia = Auth::user()->sucursal->id;
        $sucursal = Auth::user()->sucursal->id;
        $tipo_user = Auth::user()->sucursal->id;

        if ($tipo_user === 1)
            $productos = V_Producto::orderBy('id','dsc')->get();

        if ($tipo_user === 2)
            // $productos = V_ProductosFarmacia::where('farmacia_id', $farmacia)->get();
            return "farmacia";
        if ($tipo_user === 3 || $tipo_user === 3)
            // $productos = V_ProductosSucursal::where('sucursal_id', $sucursal)->get();
            return "sucursal";

        return Response::json($productos, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

    }


    public function postGuardar()
    {
        $data = Input::all();

        if(Input::has('id'))
             $producto = Producto::find(Input::get('id'));
        else
             $producto = new Producto;
        
        if($producto->guardar($data))
            return Response::json($producto, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($producto->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

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
      $producto = Producto::find($id)->get();
      return Response::json($producto, 200);
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
      $producto = Producto::find($id)->get();
      return Response::json($producto, 200);
   }


   /**
    * Update the specified resource in storage.
    *
    * @param  int  $id
    * @return Response
    */
   public function update($id)
   {
        $data = Input::all();
        $producto = Producto::find($id);
        if($producto->guardar($data))
            return Response::json($producto, 202);
        $errores = [];
        foreach ($producto->errores->all() as $error) {
            $errores[] = array('type' => 'danger', 'msg' => $error);
        }

        return Response::json($errores, 200);
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
