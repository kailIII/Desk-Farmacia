<aside class="left-side sidebar-offcanvas">
    <section class="sidebar">
        
        <!-- Sidebar User Panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img src="app/img/avatars/{{$usuario->avatar}}" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
                <p>{{$usuario->nombre}}</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- Search form -->
       <!--  <form action="#" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Buscar..."/>
                <span class="input-group-btn">
                    <button type='submit' name='seach' id='search-btn' class="btn btn-flat"><i class="fa fa-search"></i></button>
                </span>
            </div>
        </form> -->

        <!-- Sidebar Menu -->
        @if (Auth::user()->tipo->id == 1)
            @include("dashboard.opciones_admin")
        @elseif(Auth::user()->tipo->id == 2)
            @include("dashboard.opciones_farmacia")
        @else
            @include("dashboard.opciones_sucursal")
        @endif

    </section>
</aside>