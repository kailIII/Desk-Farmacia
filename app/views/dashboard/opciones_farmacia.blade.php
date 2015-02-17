<ul class="sidebar-menu">
    <!-- Dashboar -->
    <li class="active">
        <a href="#/" ng-click="titulo='Dashboard'">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
    </li>
    <!-- Productos -->
    <li>
        <a href="#/productos" ng-click="titulo='Productos'">
            <i class="fa fa-table"></i> <span>Productos</span>
        </a>
    </li>
    <!-- Clientes -->
    <li>
        <a href="#/clientes" ng-click="titulo='Clientes'">
            <i class="fa fa-table"></i> <span>Clientes</span>
        </a>
    </li>
    <!-- Proveedores -->
    <li>
        <a href="#/proveedores" ng-click="titulo='Proveedores'">
            <i class="fa fa-table"></i> <span>Proveedores</span>
        </a>
    </li>
    <!-- Compras -->
    <li>
        <a href="#/compras" ng-click="titulo='Compras'">
            <i class="fa fa-table"></i> <span>Compras</span>
        </a>
    </li>
    <!-- Ventas -->
    <li>
        <a href="#/ventas" ng-click="titulo='Ventas'">
            <i class="fa fa-table"></i> <span>Ventas</span>
        </a>
    </li>
    <!-- Sucursales -->
    <li>
        <a href="#/sucursales" ng-click="titulo='Sucursales'">
            <i class="fa fa-table"></i> <span>Sucursales</span>
        </a>
    </li>
    <!-- Requisiciones -->
    <li>
        <a href="#/requisiciones" ng-click="titulo='Requisiciones'">
            <i class="fa fa-table"></i> <span>Requisiciones</span>
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
            <li><a href="#/farmacia" ng-click="titulo='Información'">
            	<i class="fa fa-angle-double-right"></i> Información</a></li>
            <li><a href="#/usuarios" ng-click="titulo='Usuarios'">
            	<i class="fa fa-angle-double-right"></i> Usuarios</a></li>
            <li><a href="#/laboratorios" ng-click="titulo='Laboratorios'">
            	<i class="fa fa-angle-double-right"></i> Laboratorios</a></li>
        </ul>
    </li>
</ul>