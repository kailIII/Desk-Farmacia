<?php

class SucursalesController extends BaseController {

    public function getVer()
    {
        $farmacia_id = Auth::user()->sucursal->farmacia->id;

        if ( $farmacia_id == 1) {
            $sucursales = V_Sucursal::all();
        }
        else{
            $sucursales = V_Sucursal::where('farmacia_id', $farmacia_id)->get();
        }

        return Response::json($sucursales, 200, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));
    }


    public function postGuardar()
    {
        $data = Input::all();
        $data['farmacia_id'] = "2";

        if(Input::has('id'))
            $sucursal = Sucursal::find(Input::get('id'));
        else
            $sucursal = new Sucursal;
        
        if($sucursal->guardar($data))
            return Response::json($sucursal, 201, array('content-type' => 'application/json', 'Access-Control-Allow-Origin' => '*'));

        
        $errores = [];
        foreach ($sucursal->errores->all() as $error) {
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
      // $sucursal = Sucursal::find($id)->get();
      // return Response::json($sucursal, 200);

    $sucursales = Sucursal::where('farmacia_id', $id)// Auth::user()->sucursal->id)
                            ->orderBy('created_at','dsc')
                            ->get();
    return Response::json($sucursales, 200);
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
      $sucursal = Sucursal::find($id)->get();
      return Response::json($sucursal, 200);
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
        $sucursal = Sucursal::find($id);
        if($sucursal->guardar($data))
            return Response::json($sucursal, 202);
        $errores = [];
        foreach ($sucursal->errores->all() as $error) {
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
