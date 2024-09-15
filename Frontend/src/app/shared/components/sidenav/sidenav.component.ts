import { NgTemplateOutlet } from '@angular/common';
import { Component, effect, model } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { TieredMenuModule } from 'primeng/tieredmenu';

const PRIME_NG_MODULES = [TieredMenuModule, SidebarModule];
const ANGULAR_MODULES = [RouterLinkActive, NgTemplateOutlet];

@Component({
  selector: 'esp-sidenav',
  standalone: true,
  imports: [PRIME_NG_MODULES, ANGULAR_MODULES],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
})
export class SidenavComponent {
  showLabels = model.required<boolean>();
  visible = false;
  menuItems: MenuItem[] = [];
  isMobile = model<boolean>(false);

  private readonly originalMenu: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      iconStyle: { 'font-size': '1.4rem' },
      routerLink: './dashboard',
      command: () => {
        if (this.isMobile()) this.hideSidebar();
      },
    },
    {
      label: 'Pedidos',
      icon: 'pi pi-ticket',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar pedidos',
          icon: 'pi pi-list',
          routerLink: './orders/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Nuevo pedido',
          icon: 'pi pi-plus',
          routerLink: './orders/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Historial de pedidos',
          icon: 'pi pi-history',
          routerLink: './orders/history',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Clientes',
      icon: 'pi pi-users',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar clientes',
          icon: 'pi pi-list',
          routerLink: './clients/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Nuevo cliente',
          icon: 'pi pi-plus',
          routerLink: './clients/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Servicios',
      icon: 'pi pi-table',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar servicios',
          icon: 'pi pi-list',
          routerLink: './services/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Nuevo servicio',
          icon: 'pi pi-plus',
          routerLink: './services/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Inventario',
      icon: 'pi pi-box',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar inventario',
          icon: 'pi pi-list',
          routerLink: './inventory/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Nuevo producto',
          icon: 'pi pi-plus',
          routerLink: './inventory/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Facturación',
      icon: 'pi pi-receipt',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Generar factura',
          icon: 'pi pi-file-plus',
          routerLink: './billing/generate',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Historial de pagos',
          icon: 'pi pi-history',
          routerLink: './billing/history',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Promociones',
      icon: 'pi pi-percentage',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar promociones',
          icon: 'pi pi-list',
          routerLink: './deals/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Nueva promoción',
          icon: 'pi pi-plus',
          routerLink: './deals/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Gastos',
      icon: 'pi pi-money-bill',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Listar gastos',
          icon: 'pi pi-list',
          routerLink: './expenses/list',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Registrar gasto',
          icon: 'pi pi-plus',
          routerLink: './expenses/new',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
    {
      label: 'Reportes',
      icon: 'pi pi-chart-pie',
      routerLink: './reports',
      iconStyle: { 'font-size': '1.4rem' },
      command: () => {
        this.hideSidebar();
      },
    },
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      iconStyle: { 'font-size': '1.4rem' },
      items: [
        {
          label: 'Permisos',
          icon: 'pi pi-shield',
          routerLink: './configuration/permissions',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
        {
          label: 'Usuarios',
          icon: 'pi pi-users',
          routerLink: './configuration/users',
          command: () => {
            if (this.isMobile()) this.hideSidebar();
          },
        },
      ],
    },
  ];

  constructor() {
    effect(() => {
      const showLabels = this.showLabels();
      this.visible = !showLabels;
      if (!this.isMobile()) {
        if (showLabels) {
          this.menuItems = this.originalMenu;
        } else {
          this.menuItems = this.originalMenu.map((item) => {
            let changedItem = { ...item, label: '', tooltip: item.label };
            if (changedItem.items) {
              changedItem.tooltip = undefined;
            }
            return changedItem;
          });
        }
      } else {
        this.menuItems = this.originalMenu;
      }
    });
  }

  hideSidebar() {
    this.showLabels.set(this.visible);
  }
}
