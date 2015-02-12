<ul class="sidebar-menu">
    <!-- Dashboar -->
    <li class="active">
        <a href="#/">
            <i class="fa fa-dashboard" ng-click="titulo='Dashboard'"></i> <span>Dashboard</span>
        </a>
    </li>
    <!-- Productos -->
    <li>
        <a href="#/productos">
            <i class="fa fa-table" ng-click="header('Productos');"></i> <span>Productos</span>
        </a>
    </li>
    <!-- Clientes -->
    <li>
        <a href="#/clientes">
            <i class="fa fa-table" ng-click="header('Clientes');"></i> <span>Clientes</span>
        </a>
    </li>
    <!-- Proveedores -->
    <li>
        <a href="#/proveedores">
            <i class="fa fa-table" ng-click="header('Proveedores');"></i> <span>Proveedores</span>
        </a>
    </li>
    <!-- Compras -->
    <li>
        <a href="#/compras">
            <i class="fa fa-table" ng-click="header('Compras');"></i> <span>Compras</span>
        </a>
    </li>
    <!-- Ventas -->
    <li>
        <a href="#/ventas">
            <i class="fa fa-table" ng-click="header('Ventas');"></i> <span>Ventas</span>
        </a>
    </li>
    <!-- Sucursales -->
    <li>
        <a href="#/sucursales">
            <i class="fa fa-table" ng-click="header('Sucursales');"></i> <span>Sucursales</span>
        </a>
    </li>
    <!-- Requisiciones -->
    <li>
        <a href="#/requisiciones">
            <i class="fa fa-table" ng-click="header('Requisiciones');"></i> <span>Requisiciones</span>
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
            <li><a href="#/farmacia" ng-click="header('Información');">
            	<i class="fa fa-angle-double-right"></i> Información</a></li>
            <li><a href="#/usuarios" ng-click="header('Usuarios');">
            	<i class="fa fa-angle-double-right"></i> Usuarios</a></li>
            <li><a href="#/laboratorios" ng-click="header('Laboratorios');">
            	<i class="fa fa-angle-double-right"></i> Laboratorios</a></li>
        </ul>
    </li>
</ul>