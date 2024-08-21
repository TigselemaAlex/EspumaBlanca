import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/api/auth.service';

@Component({
  selector: 'app-header-toolbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './header-toolbar.component.html',
  styleUrl: './header-toolbar.component.scss',
})
export class HeaderToolbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  loggedUser = input.required();
  onToggleSidenav = output();

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
