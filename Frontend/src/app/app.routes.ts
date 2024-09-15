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
        path: 'recover-password',
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
    data: { label: '', icon: 'pi pi-home' },
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
          label: 'Dashboard',
          title: 'Dashboard',
        },
      },
      {
        path: 'orders',
        data: { label: 'Pedidos', icon: 'article' },
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
              label: 'Listado',
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
              label: 'Nuevo',
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
              label: 'Editar',
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
              label: 'Historial',
              title: 'Historial de pedidos',
            },
          },
        ],
      },
      {
        path: 'clients',
        data: { label: 'Clientes' },
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
              label: 'Listado',
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
              label: 'Nuevo',
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
              label: 'Editar',
              title: 'Editar Cliente',
            },
          },
        ],
      },
      {
        path: 'services',
        data: { label: 'Servicios' },
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
              label: 'Listado',
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
              label: 'Nuevo',
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
              label: 'Editar',
              title: 'Editar Servicio',
            },
          },
        ],
      },
      {
        path: 'inventory',
        data: { label: 'Inventario' },
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
              label: 'Listado',
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
              label: 'Nuevo',
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
              label: 'Editar',
              title: 'Editar Inventario',
            },
          },
        ],
      },
      {
        path: 'billing',
        data: { label: 'Facturación' },
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
              label: 'Generar Factura',
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
              label: 'Historial de pagos',
              title: 'Historial de pagos',
            },
          },
        ],
      },
      {
        path: 'deals',
        data: { label: 'Promociones' },
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
              label: 'Listado',
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
              label: 'Nueva',
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
              label: 'Editar',
              title: 'Editar Promoción',
            },
          },
        ],
      },
      {
        path: 'expenses',
        data: { label: 'Gastos' },
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
              label: 'Listado',
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
              label: 'Nuevo',
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
              label: 'Editar',
              title: 'Editar Gasto',
            },
          },
        ],
      },
      {
        path: 'reports',
        data: { label: 'Reportes', title: 'Reportes' },
        loadComponent: () =>
          import('./home/pages/reports/reports.component').then(
            (m) => m.ReportsComponent
          ),
      },
      {
        path: 'configuration',
        data: {
          label: 'Configuración',
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
              label: 'Permisos',
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
              label: 'Usuarios',
              title: 'Configuración de usuarios',
            },
          },
        ],
      },
      {
        path: 'profile',
        data: { label: 'Perfil' },
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
              label: 'Ver',
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
              label: 'Editar',
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
              label: 'Contraseña',
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
