import { AuthorityName } from '../../auth/response/current-user.model';

export interface PermissionInRoleDto {
  id: number;
  name: AuthorityName;
  assigned: boolean;
}
