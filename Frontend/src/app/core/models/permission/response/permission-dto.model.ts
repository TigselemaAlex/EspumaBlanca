import { AuthorityName } from '../../auth/response/current-user.model';

export interface PermissionDto {
  id: number;
  name: AuthorityName;
}
