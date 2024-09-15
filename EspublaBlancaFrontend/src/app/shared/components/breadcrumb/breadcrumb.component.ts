import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  breadcrumbs: { label: string; url: string; icon: string; title: string }[] =
    [];

  title = 'breadcrumb';

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
    breadcrumbs: {
      label: string;
      url: string;
      icon: string;
      title: string;
    }[] = []
  ): { label: string; url: string; icon: string; title: string }[] {
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
        url: url,
        icon: child.snapshot.data['icon'],
        title: child.snapshot.data['title'],
      });
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }
}
