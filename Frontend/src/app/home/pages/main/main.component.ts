import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import {
  AuthorityName,
  CurrentUser,
} from '../../../core/models/auth/response/current-user.model';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { HeaderToolbarComponent } from '../../../shared/components/header-toolbar/header-toolbar.component';
import { SidenavComponent } from '../../../shared/components/sidenav/sidenav.component';
import { AuthService } from './../../../core/services/api/auth.service';
import { AuthorityStorageService } from './../../../core/services/application/authority-storage.service';

const SHARED_COMPONENTS = [
  HeaderToolbarComponent,
  SidenavComponent,
  BreadcrumbComponent,
];
const ANGULAR_MODULES = [RouterOutlet];

@Component({
  selector: 'esp-main',
  standalone: true,
  imports: [SHARED_COMPONENTS, ANGULAR_MODULES],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly authService = inject(AuthService);

  currentYear = new Date().getFullYear();

  expandedSidenav = true;
  isMobile = false;

  currentUser!: CurrentUser;

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  ngOnInit(): void {
    this.checkWidthViewport();
    this.authService.currentUser().subscribe();
    this.authorityStorage.currentUser$.subscribe((resp) => {
      this.currentUser = resp;
      if (this.currentUser.id) {
        let authorities: Set<AuthorityName> = new Set();
        resp.permissions.forEach((permission) =>
          authorities.add(permission.authority)
        );
        this.authorityStorage.setAuthorities(authorities);
      }
    });
  }

  toggleSidenav() {
    this.expandedSidenav = !this.expandedSidenav;
  }

  calculateSidebarWidth(): string {
    if (this.isMobile) {
      return '0rem';
    } else {
      return this.expandedSidenav ? '14rem' : '6rem';
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWidthViewport();
  }

  private checkWidthViewport(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
