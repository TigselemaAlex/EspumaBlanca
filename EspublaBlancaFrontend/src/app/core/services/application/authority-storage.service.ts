import { Injectable } from '@angular/core';
import {
  AuthorityName,
  CurrentUser,
} from '../../models/auth/response/current-user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorityStorageService {
  private _currentUser = new BehaviorSubject<CurrentUser>({} as CurrentUser);
  private _authorities: Set<AuthorityName> = new Set();
  public currentUser$ = this._currentUser.asObservable();

  setAuthorities(authorities: Set<AuthorityName>) {
    this._authorities = authorities;
  }

  hasAuthority(authority: AuthorityName) {
    return this._authorities.has(
      AuthorityName[authority] as unknown as AuthorityName
    );
  }

  public updateCurrentUser(currentUser: CurrentUser) {
    this._currentUser.next(currentUser);
  }
}
