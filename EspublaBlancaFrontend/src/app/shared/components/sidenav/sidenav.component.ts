import { Component, effect, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MenuItem } from '../../../core/models/system/menu-item.model';
import { MatIcon } from '@angular/material/icon';
import { widthInOutTrigger } from '../../animations/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIcon,
    MatExpansionModule,
    RouterLink,
    RouterLinkActive,
    MatTooltipModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  animations: [widthInOutTrigger],
})
export class SidenavComponent {
  showLabels = input.required<boolean>();

  menuItems = signal<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: './dashboard',
    },
    {
      label: 'Pedidos',
      icon: 'article',
      children: [
        {
          label: 'Listar pedidos',
          icon: 'view_list',
          link: './orders/list',
        },
        {
          label: 'Nuevo pedido',
          icon: 'post_add',
          link: './orders/new',
        },
        {
          label: 'Historial de pedidos',
          icon: 'history',
          link: './orders/history',
        },
      ],
    },
    {
      label: 'Clientes',
      icon: 'people',
      children: [
        {
          label: 'Listar clientes',
          icon: 'view_list',
          link: './clients/list',
        },
        {
          label: 'Nuevo cliente',
          icon: 'person_add',
          link: './clients/new',
        },
      ],
    },
    {
      label: 'Servicios',
      icon: 'local_laundry_service',
      children: [
        {
          label: 'Listar servicios',
          icon: 'view_list',
          link: './services/list',
        },
        {
          label: 'Nuevo servicio',
          icon: 'add_circle',
          link: './services/new',
        },
      ],
    },
    {
      label: 'Inventario',
      icon: 'inventory',
      children: [
        {
          label: 'Listar inventario',
          icon: 'view_list',
          link: './inventory/list',
        },
        {
          label: 'Nuevo producto',
          icon: 'add_circle',
          link: './inventory/new',
        },
      ],
    },
    {
      label: 'Facturación',
      icon: 'receipt_long',
      children: [
        {
          label: 'Generar Factura',
          icon: 'receipt',
          link: './billing/generate',
        },
        {
          label: 'Historial de pagos',
          icon: 'history',
          link: './billing/history',
        },
      ],
    },
    {
      label: 'Promociones',
      icon: 'sell',
      children: [
        {
          label: 'Listar promociones',
          icon: 'view_list',
          link: './deals/list',
        },
        {
          label: 'Nueva promoción',
          icon: 'add_circle',
          link: './deals/new',
        },
      ],
    },
    {
      label: 'Gastos',
      icon: 'money_off',
      children: [
        {
          label: 'Listar gastos',
          icon: 'view_list',
          link: './expenses/list',
        },
        {
          label: 'Registrar gasto',
          icon: 'add_circle',
          link: './expenses/new',
        },
      ],
    },
    {
      label: 'Reportes',
      icon: 'analytics',
      link: './reports',
    },
    {
      label: 'Configuración',
      icon: 'settings',
      children: [
        {
          label: 'Permisos',
          icon: 'admin_panel_settings',
          link: './configuration/permissions',
        },
        {
          label: 'Usuarios',
          icon: 'manage_accounts',
          link: './configuration/users',
        },
      ],
    },
  ]);
}
