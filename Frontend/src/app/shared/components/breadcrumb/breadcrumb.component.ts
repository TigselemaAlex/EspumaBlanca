import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { filter } from 'rxjs';

const PRIME_NG_MODULES = [BreadcrumbModule];

@Component({
  selector: 'esp-breadcrumb',
  standalone: true,
  imports: [PRIME_NG_MODULES],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  title = '';

  breadcrumbs: MenuItem[] = [];

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.activatedRoute.root);
      });
  }

  buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: MenuItem[] = []
  ): MenuItem[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      this.title = route.snapshot.data['title'];
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }
      breadcrumbs.push({
        label: child.snapshot.data['label'],
        routerLink: url,
        icon: child.snapshot.data['icon'],
        title: child.snapshot.data['title'],
      });
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
