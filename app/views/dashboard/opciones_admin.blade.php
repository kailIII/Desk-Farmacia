<ul class="sidebar-menu">
    <!-- Dashboar -->
    <li class="active">
        <a href="#/">
            <i class="fa fa-dashboard" ng-click="titulo='Dashboard'"></i> <span>Dashboard</span>
        </a>
    </li>
    <!-- Productos -->
    <li class="treeview">
        <a href="#">
            <i class="fa fa-bar-chart-o"></i>
            <span>Productos</span>
            <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
            <li><a href="#/productos" ng-click="titulo='Productos'"><i class="fa fa-angle-double-right"></i> Productos</a></li>
            <li><a href="#/categorias" ng-click="titulo='Categorias'"><i class="fa fa-angle-double-right"></i> Categorias</a></li>
        </ul>
    </li>
    
    <!-- Farmacias -->
    <li>
        <a href="#/farmacias">
            <i class="fa fa-table" ng-click="titulo='Farmacias'"></i> <span>Farmacias</span>
        </a>
    </li>
    <!-- Admon -->
    <li class="treeview">
        <a href="#">
            <i class="fa fa-bar-chart-o"></i>
            <span>Administración</span>
            <i class="fa fa-angle-left pull-right"></i>
        </a>
        <ul class="treeview-menu">
            <li><a href="#/usuarios" ng-click="titulo='Usuarios'"><i class="fa fa-angle-double-right"></i> Usuarios</a></li>
        </ul>
    </li>
</ul>