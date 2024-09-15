import { Component, inject, input, OnInit, output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AuthService } from '../../../core/services/api/auth.service';
import { AvatarModule } from 'primeng/avatar';

const ANGULAR_MODULES = [RouterLink];
const PRIME_NG_MODULES = [ButtonModule, TieredMenuModule, AvatarModule];

@Component({
  selector: 'esp-header-toolbar',
  standalone: true,
  imports: [ANGULAR_MODULES, PRIME_NG_MODULES],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loggedUser = input.required<string>();
  avatarLabel = 'U';
  onToggleSidenav = output();
  menuItems: MenuItem[] = [
    {
      label: 'Perfil',
      icon: 'pi pi-id-card',
      items: [
        {
          label: 'Ver perfil',
          icon: 'pi pi-user',
          routerLink: './profile/view',
        },
        {
          label: 'Editar perfil',
          icon: 'pi pi-user-edit',
          routerLink: './profile/edit',
        },
        {
          label: 'Cambiar contraseña',
          icon: 'pi pi-key',
          routerLink: './profile/password',
        },
      ],
    },
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];

  ngOnInit(): void {
    this.avatarLabel = this.loggedUser()
      .split(' ')
      .map((word) => word[0])
      .join('');
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
