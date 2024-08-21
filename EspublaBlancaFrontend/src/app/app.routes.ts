import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'recover',
        loadComponent: () =>
          import('./auth/recovery-password/recovery-password.component').then(
            (m) => m.RecoveryPasswordComponent
          ),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/pages/main/main.component').then((m) => m.MainComponent),
    data: { breadcrumb: '', icon: 'home' },
    canActivateChild: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./home/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        data: {
          breadcrumb: 'Dashboard',
          icon: 'dashboard',
          title: 'Dashboard',
        },
      },
      {
        path: 'orders',
        data: { breadcrumb: 'Pedidos', icon: 'article' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './home/pages/orders/order-list/order-list.component'
              ).then((m) => m.OrderListComponent),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de pedidos',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/pages/orders/order-form/order-form.component'
              ).then((m) => m.OrderFormComponent),
            data: {
              breadcrumb: 'Nuevo',
              icon: 'post_add',
              title: 'Nuevo Pedido',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './home/pages/orders/order-form/order-form.component'
              ).then((m) => m.OrderFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Pedido',
            },
          },
          {
            path: 'history',
            loadComponent: () =>
              import(
                './home/pages/orders/order-history/order-history.component'
              ).then((m) => m.OrderHistoryComponent),
            data: {
              breadcrumb: 'Historial',
              icon: 'history',
              title: 'Historial de pedidos',
            },
          },
        ],
      },
      {
        path: 'clients',
        data: { breadcrumb: 'Clientes', icon: 'people' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './home/pages/clients/client-list/client-list.component'
              ).then((m) => m.ClientListComponent),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de clientes',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/pages/clients/client-form/client-form.component'
              ).then((m) => m.ClientFormComponent),
            data: {
              breadcrumb: 'Nuevo',
              icon: 'person_add',
              title: 'Nuevo Cliente',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './home/pages/clients/client-form/client-form.component'
              ).then((m) => m.ClientFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Cliente',
            },
          },
        ],
      },
      {
        path: 'services',
        data: { breadcrumb: 'Servicios', icon: 'local_laundry_service' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './home/pages/laundry-services/service-list/service-list.component'
              ).then((m) => m.ServiceListComponent),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de servicios',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/pages/laundry-services/service-form/service-form.component'
              ).then((m) => m.ServiceFormComponent),
            data: {
              breadcrumb: 'Nuevo',
              icon: 'add_circle',
              title: 'Nuevo Servicio',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './home/pages/laundry-services/service-form/service-form.component'
              ).then((m) => m.ServiceFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Servicio',
            },
          },
        ],
      },
      {
        path: 'inventory',
        data: { breadcrumb: 'Inventario', icon: 'inventory' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './home/pages/inventory/inventory-list/inventory-list.component'
              ).then((m) => m.InventoryListComponent),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de inventario',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/pages/inventory/inventory-form/inventory-form.component'
              ).then((m) => m.InventoryFormComponent),
            data: {
              breadcrumb: 'Nuevo',
              icon: 'add_circle',
              title: 'Nuevo Producto',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './home/pages/inventory/inventory-form/inventory-form.component'
              ).then((m) => m.InventoryFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Inventario',
            },
          },
        ],
      },
      {
        path: 'billing',
        data: { breadcrumb: 'Facturación', icon: 'receipt_long' },
        children: [
          {
            path: '',
            redirectTo: 'generate',
            pathMatch: 'full',
          },
          {
            path: 'generate',
            loadComponent: () =>
              import(
                './home/pages/billing/billing-form/billing-form.component'
              ).then((m) => m.BillingFormComponent),
            data: {
              breadcrumb: 'Generar Factura',
              icon: 'receipt',
              title: 'Generar Factura',
            },
          },
          {
            path: 'history',
            loadComponent: () =>
              import(
                './home/pages/billing/billing-history/billing-history.component'
              ).then((m) => m.BillingHistoryComponent),
            data: {
              breadcrumb: 'Historial de pagos',
              icon: 'history',
              title: 'Historial de pagos',
            },
          },
        ],
      },
      {
        path: 'deals',
        data: { breadcrumb: 'Promociones', icon: 'sell' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import('./home/pages/deals/deal-list/deal-list.component').then(
                (m) => m.DealListComponent
              ),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de promociones',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./home/pages/deals/deal-form/deal-form.component').then(
                (m) => m.DealFormComponent
              ),
            data: {
              breadcrumb: 'Nueva',
              icon: 'add_circle',
              title: 'Nueva Promoción',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import('./home/pages/deals/deal-form/deal-form.component').then(
                (m) => m.DealFormComponent
              ),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Promoción',
            },
          },
        ],
      },
      {
        path: 'expenses',
        data: { breadcrumb: 'Gastos', icon: 'money_off' },
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import(
                './home/pages/expenses/expense-list/expense-list.component'
              ).then((m) => m.ExpenseListComponent),
            data: {
              breadcrumb: 'Listado',
              icon: 'view_list',
              title: 'Listado de gastos',
            },
          },
          {
            path: 'new',
            loadComponent: () =>
              import(
                './home/pages/expenses/expense-form/expense-form.component'
              ).then((m) => m.ExpenseFormComponent),
            data: {
              breadcrumb: 'Nuevo',
              icon: 'add_circle',
              title: 'Nuevo Gasto',
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>
              import(
                './home/pages/expenses/expense-form/expense-form.component'
              ).then((m) => m.ExpenseFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Gasto',
            },
          },
        ],
      },
      {
        path: 'reports',
        data: { breadcrumb: 'Reportes', icon: 'analytics', title: 'Reportes' },
        loadComponent: () =>
          import('./home/pages/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: 'configuration',
        data: {
          breadcrumb: 'Configuración',
          icon: 'settings',
        },
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'users',
          },
          {
            path: 'permissions',
            loadComponent: () =>
              import(
                './home/pages/configuration/permissions/permissions.component'
              ).then((m) => m.PermissionsComponent),
            data: {
              breadcrumb: 'Permisos',
              icon: 'admin_panel_settings',
              title: 'Configuración de permisos',
            },
          },
          {
            path: 'users',
            loadComponent: () =>
              import('./home/pages/configuration/users/users.component').then(
                (m) => m.UsersComponent
              ),
            data: {
              breadcrumb: 'Usuarios',
              icon: 'manage_accounts',
              title: 'Configuración de usuarios',
            },
          },
        ],
      },
      {
        path: 'profile',
        data: { breadcrumb: 'Perfil', icon: 'account_circle' },
        children: [
          {
            path: '',
            redirectTo: 'view',
            pathMatch: 'full',
          },
          {
            path: 'view',
            loadComponent: () =>
              import(
                './home/pages/profile/profile-view/profile-view.component'
              ).then((m) => m.ProfileViewComponent),
            data: {
              breadcrumb: 'Ver',
              icon: 'account_box',
              title: 'Perfil',
            },
          },
          {
            path: 'edit',
            loadComponent: () =>
              import(
                './home/pages/profile/profile-form/profile-form.component'
              ).then((m) => m.ProfileFormComponent),
            data: {
              breadcrumb: 'Editar',
              icon: 'edit',
              title: 'Editar Perfil',
            },
          },
          {
            path: 'password',
            loadComponent: () =>
              import(
                './home/pages/profile/profile-password/profile-password.component'
              ).then((m) => m.ProfilePasswordComponent),
            data: {
              breadcrumb: 'Contraseña',
              icon: 'lock_reset',
              title: 'Cambiar contraseña',
            },
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
