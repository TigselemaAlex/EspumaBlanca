import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthorityStorageService } from '../services/application/authority-storage.service';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/api/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authorityStorageService = inject(AuthorityStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);
  return from(
    authorityStorageService.currentUser$.pipe(
      switchMap((resp) => {
        if (resp.id) {
          return new Observable<boolean>((observer) => observer.next(true));
        }
        const authObservable = authService.refreshToken().pipe(
          switchMap(() => {
            return new Observable<boolean>((observer) => observer.next(true));
          }),
          catchError(() => {
            router.navigateByUrl('/auth/login');
            return new Observable<boolean>((observer) => observer.next(false));
          })
        );
        return authObservable;
      })
    )
  );
};
