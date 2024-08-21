import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderToolbarComponent } from '../../../shared/components/header-toolbar/header-toolbar.component';
import { SidenavComponent } from '../../../shared/components/sidenav/sidenav.component';
import { marginTrigger } from '../../../shared/animations/animations';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/api/auth.service';
import {
  AuthorityName,
  CurrentUser,
} from '../../../core/models/auth/response/current-user.model';
import { AuthorityStorageService } from '../../../core/services/application/authority-storage.service';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    HeaderToolbarComponent,
    SidenavComponent,
    BreadcrumbComponent,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  animations: [marginTrigger],
})
export class MainComponent implements AfterViewInit, OnInit {
  private readonly cdr = inject(ChangeDetectorRef);
  private drawer = viewChild<MatDrawer>('drawer');
  private readonly authorityStorage = inject(AuthorityStorageService);
  private readonly authService = inject(AuthService);

  year = new Date().getFullYear();

  expandedSidenav = true;
  drawerInitMargin = signal<string>('10px');

  currentUser!: CurrentUser;

  ngOnInit(): void {
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

  ngAfterViewInit(): void {
    this.drawerInitMargin.set(
      (this.drawer() as any)._elementRef.nativeElement.offsetWidth - 8 + 'px'
    );
    this.cdr.detectChanges();
  }

  toggleSidenav() {
    this.expandedSidenav = !this.expandedSidenav;
  }
}
