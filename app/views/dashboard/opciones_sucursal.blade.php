<ul class="sidebar-menu">
    <!-- Dashboar -->
    <li class="active">
        <a href="#/" ng-click="header('Dashboard');">
            <i class="fa fa-dashboard"></i> <span>Dashboard</span>
        </a>
    </li>
    <!-- Productos -->
    <li>
        <a href="#/productos" ng-click="header('Productos');">
            <i class="fa fa-table"></i> <span>Productos</span>
        </a>
    </li>
    <!-- Clientes -->
    <li>
        <a href="#/clientes" ng-click="header('Clientes');">
            <i class="fa fa-table"></i> <span>Clientes</span>
        </a>
    </li>
    <!-- Ventas -->
    <li>
        <a href="#/ventas" ng-click="header('Ventas');">
            <i class="fa fa-table"></i> <span>Ventas</span>
        </a>
    </li>
    <!-- Requisiciones -->
    <li>
        <a href="#/requisiciones" ng-click="header('Requisiciones');">
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
            <li><a href="#/sucursal" ng-click="header('Información');">
            	<i class="fa fa-angle-double-right"></i> Información</a></li>
            <li><a href="#/usuarios" ng-click="header('Usuarios');">
            	<i class="fa fa-angle-double-right"></i> Usuarios</a></li>
        </ul>
    </li>
</ul>