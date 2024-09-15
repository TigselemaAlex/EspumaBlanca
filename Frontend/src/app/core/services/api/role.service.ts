import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RoleDto } from '../../models/role/response/role-dto.model';
import { RoleUpdatePermissionsRequest } from '../../models/role/request/role-update-permissions-request.model';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly endpoint = environment.apiUrl + '/protected/roles';
  private readonly http = inject(HttpClient);

  getAll() {
    return this.http.get<RoleDto[]>(this.endpoint);
  }

  updatePermissions(id: number, request: RoleUpdatePermissionsRequest) {
    return this.http.put<RoleDto[]>(this.endpoint + '/' + id, request);
  }
}
