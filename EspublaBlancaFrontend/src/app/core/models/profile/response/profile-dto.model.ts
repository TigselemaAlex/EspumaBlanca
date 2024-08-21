import { RoleWithoutPermissionsDto } from '../../role/response/role-without-permissions-dto.model';

export interface ProfileDto {
  id: number;
  name: string;
  lastname: string;
  phone: string;
  ci: string;
  email: string;
  roles: RoleWithoutPermissionsDto[];
}
