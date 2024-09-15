import { PermissionDto } from '../../permission/response/permission-dto.model';

export interface RoleDto {
  id: number;
  name: RoleName;
  permissions: PermissionDto[];
}

export enum RoleName {
  SUPER_ADMIN,
  OWNER,
  MANAGER,
  SELLER,
}
