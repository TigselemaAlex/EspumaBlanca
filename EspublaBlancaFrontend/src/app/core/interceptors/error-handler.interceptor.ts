import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ngx-french-toast';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/api/auth.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const authService = inject(AuthService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorTitle = '';
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorTitle = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorTitle = 'Petición incorrecta';
            errorMessage = error.error.message;
            break;
          case 401:
            errorTitle = 'No autorizado';
            errorMessage = error.error.message;
            break;
          case 403:
            errorTitle = 'No tiene permisos para acceder a este recurso';
            return refreshTokenMethod(req, next, authService, router);
          case 404:
            errorTitle = 'No se encontró el recurso solicitado';
            errorMessage = error.error.message;
            break;
          case 409:
            errorTitle = 'Conflicto en la petición';
            errorMessage = error.error.message;
            break;
          case 500:
            errorTitle = 'Error interno del servidor';
            errorMessage = error.error.message;
            break;
          default:
            errorTitle = 'Ha ocurrido un error';
            break;
        }
      }
      toastService.danger({
        title: errorTitle,
        content: errorMessage,
      });
      return throwError(() => errorTitle + ': ' + errorMessage);
    })
  );
};

const refreshTokenMethod = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router
) => {
  return from(
    authService.refreshToken().pipe(
      switchMap(() => {
        return next(req);
      }),
      catchError((error) => {
        authService.logout().subscribe(() => {
          router.navigate(['/auth/login']);
        });
        return throwError(() => error);
      })
    )
  );
};
