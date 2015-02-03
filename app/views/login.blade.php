<!DOCTYPE html>
<html class="bg-black">
    <head>
        <meta charset="UTF-8">
        <title>Farmacia | Log in</title>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
        
        <!-- CSS -->
        <link href="app/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="app/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="app/css/AdminLTE.css" rel="stylesheet" type="text/css" />

    </head>
    <body class="bg-black">

        <div class="form-box" id="login-box">
            <div class="header">Inicio de Sesión</div>
            
            {{ Form::open(array('url' => '/login')) }}
                <div class="body bg-gray">
                    <div class="form-group">
                        <input type="text" name="email" class="form-control" placeholder="Correo Electrónico"/>
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control" placeholder="Contraseña"/>
                    </div>          
                    <div class="form-group">
                        <input type="checkbox" name="remember_me"/> Recordarme
                    </div>
                </div>
                <div class="footer">                                                               
                    <button type="submit" class="btn bg-olive btn-block">Ingresar</button>  
                    
                    <p><a href="#">Olvide mi contraseña</a></p>
                    
                    <a href="register.html" class="text-center">Registrarme</a>
                </div>
            {{Form::close()}}

        </div>

        <!-- JS -->
        <script src="app/js/jquery.min.js"></script>
        <script src="app/js/bootstrap.min.js" type="text/javascript"></script>        

    </body>
</html>