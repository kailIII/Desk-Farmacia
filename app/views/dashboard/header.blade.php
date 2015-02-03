<header class="header">
    <!-- Logo -->
    <a href="#/" class="logo"> <!--Class icon to your logo image or logo icon --> {{$usuario->sucursal}} </a>

    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top" role="navigation">
        <!-- Sidebar toggle button-->
        <a href="#" class="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        <div class="navbar-right">
            <ul class="nav navbar-nav">
                
                <!-- User Account: -->
                <li class="dropdown user user-menu">
                    <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                        <i class="glyphicon glyphicon-user"></i>
                        <span>{{$usuario->nombre}}<i class="caret"></i></span>
                    </a>
                    <ul class="dropdown-menu">
                        <!-- User image -->
                        <li class="user-header bg-light-blue">
                            <img src="app/img/avatars/{{$usuario->avatar}}" class="img-circle" alt="User Image" />
                            <p>
                                {{$usuario->nombre}} - {{$usuario->sucursal}}
                                <small>{{$usuario->tipo}}</small>
                            </p>
                        </li>
                        <!-- Menu Footer-->
                        <li class="user-footer">
                            <div class="pull-left">
                                <a href="#" class="btn btn-default btn-flat">Perfil</a>
                            </div>
                            <div class="pull-right">
                                <a href="/Desk-Farmacia/public/logout" class="btn btn-default btn-flat">Cerrar Sesión</a>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>
        </div>
    </nav>

</header>
