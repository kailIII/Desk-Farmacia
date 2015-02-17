
<!-- Izquierda -->
<aside class="left-side sidebar-offcanvas">
    <section class="sidebar">
        
        <!-- Sidebar User Panel -->
        <div class="user-panel">
            <div class="pull-left image">
                <img ng-src="app/img/avatars/@{{usuario.avatar}}" class="img-circle" alt="User Image" />
            </div>
            <div class="pull-left info">
                <p>@{{usuario.user}}</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
            </div>
        </div>

        <!-- Search form -->
        <form action="" method="get" class="sidebar-form">
            <div class="input-group">
                <input type="text" ng-model="q" class="form-control" placeholder="Buscar..."/>
                <span class="input-group-btn">
                    <button type='submit' name='seach' id='search-btn' class="btn btn-flat" ng-click="buscar(q);">
                    	<i class="fa fa-search"></i>
                    </button>
                </span>
            </div>
        </form>

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

<!-- Derecha -->
<aside class="right-side">

  <!-- Header -->
  <section class="content-header">
      <h1>
          @{{titulo}} <small>Listado</small>
      </h1>
      <ol class="breadcrumb">
          <li><a href="#/"><i class="fa fa-dashboard"></i> Inicio</a></li>
          <li class="active">@{{titulo}}</li>
      </ol>
  </section>

  <!-- Main content -->
  <section class="content"> 
    <div ng-view></div>
  </section>
</aside>