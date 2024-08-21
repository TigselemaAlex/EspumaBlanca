import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PermissionInRoleDto } from '../../models/permission/response/permission-in-role-dto.model';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly endpoint = environment.apiUrl + '/protected/permissions';
  private readonly http = inject(HttpClient);

  getAllByRoleId(roleId: number) {
    return this.http.get<PermissionInRoleDto[]>(this.endpoint + '/' + roleId);
  }
}
