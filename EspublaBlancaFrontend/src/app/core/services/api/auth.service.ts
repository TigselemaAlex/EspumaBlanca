import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthLoginRequest } from '../../models/auth/request/auth-login-request.model';
import { CurrentUser } from '../../models/auth/response/current-user.model';
import { AuthorityStorageService } from '../application/authority-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly endpoint = environment.apiUrl + '/public/auth';
  private readonly http = inject(HttpClient);
  private readonly authorityStorage = inject(AuthorityStorageService);

  login(request: AuthLoginRequest) {
    return this.http.post<void>(this.endpoint, request).pipe(
      switchMap(() => {
        return this.currentUser();
      })
    );
  }

  logout() {
    return this.http.post<void>(this.endpoint + '/logout', {}).pipe(
      tap(() => {
        this.authorityStorage.updateCurrentUser({} as CurrentUser);
      })
    );
  }

  currentUser() {
    return this.http.get<CurrentUser>(this.endpoint + '/current-user').pipe(
      tap((resp) => {
        this.authorityStorage.updateCurrentUser(resp);
      })
    );
  }

  refreshToken() {
    return this.http.post<void>(this.endpoint + '/refresh-token', {}).pipe(
      switchMap(() => {
        return this.currentUser();
      })
    );
  }
}
