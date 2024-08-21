import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ToastService } from 'ngx-french-toast';
import { PermissionInRoleDto } from '../../../../core/models/permission/response/permission-in-role-dto.model';
import { RoleUpdatePermissionsRequest } from '../../../../core/models/role/request/role-update-permissions-request.model';
import { RoleDto } from '../../../../core/models/role/response/role-dto.model';
import { PermissionService } from '../../../../core/services/api/permission.service';
import { RoleService } from '../../../../core/services/api/role.service';
import { FormContainerComponent } from '../../../../shared/components/form-container/form-container.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
];
const ANGULAR_MODULES = [NgClass, FormsModule];
const MY_COMPONENTS = [FormContainerComponent];

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [MATERIAL_MODULES, MY_COMPONENTS, ANGULAR_MODULES],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.scss',
})
export class PermissionsComponent implements OnInit {
  private readonly roleService = inject(RoleService);
  private readonly permissionService = inject(PermissionService);
  private readonly toastService = inject(ToastService);
  private readonly dialog = inject(MatDialog);

  roles: RoleDto[] = [];

  selectedRole?: RoleDto;

  permissionsInSelectedRole: PermissionInRoleDto[] = [];

  permissionsGrouped: {
    [key: string]: PermissionInRoleDto[];
  } = {};

  ngOnInit(): void {
    this.getAllRoles();
  }

  getAllRoles() {
    this.roleService.getAll().subscribe((resp) => {
      this.roles = resp;
    });
  }

  selectRole(role: RoleDto) {
    this.permissionsInSelectedRole = [];
    this.permissionsGrouped = {};
    if (this.isSameRole(role)) {
      this.selectedRole = undefined;
    } else {
      this.selectedRole = role;
      this.permissionService
        .getAllByRoleId(this.selectedRole.id)
        .subscribe((resp) => {
          this.permissionsInSelectedRole = resp;
          this.groupPermissionsByModule();
        });
    }
  }

  isSameRole(role: RoleDto) {
    return this.selectedRole === role;
  }

  getModule(permission: PermissionInRoleDto) {
    return permission.name.toString().split('_')[0];
  }

  groupPermissionsByModule() {
    this.permissionsInSelectedRole.forEach((permission) => {
      const module = this.getModule(permission);
      if (!this.permissionsGrouped[module]) {
        this.permissionsGrouped[module] = [];
      }
      this.permissionsGrouped[module].push(permission);
    });
  }

  getModuleKey() {
    return Object.keys(this.permissionsGrouped).map((key) => key);
  }

  getModuleValues(key: string) {
    return this.permissionsGrouped[key];
  }

  togglePermission(id: number) {
    let permission = this.permissionsInSelectedRole.find(
      (permission) => permission.id === id
    );
    if (permission) {
      permission.assigned = !permission.assigned;
    }
  }
  save() {
    if (this.selectedRole) {
      let data = {
        title: 'Confirmar actualización de permisos',
        content: `¿Está seguro que desea actualizar los permisos del rol: <strong class="text-purple-700">${this.selectedRole.name}</strong>?`,
      };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === true) {
          this.updatePermissions();
        }
      });
    }
  }

  private updatePermissions() {
    this.roleService
      .updatePermissions(this.selectedRole!.id, this.getPermissionsIds())
      .subscribe(() => {
        this.toastService.success({
          title: 'Permisos actualizados exitosamente',
        });
        this.getAllRoles();
        this.reset();
      });
  }

  getPermissionsIds() {
    let request: RoleUpdatePermissionsRequest = {
      permissions: [],
    };
    request.permissions = this.permissionsInSelectedRole
      .filter((permission) => permission.assigned)
      .map((permission) => permission.id);
    return request;
  }

  private reset() {
    this.permissionsInSelectedRole = [];
    this.permissionsGrouped = {};
    this.selectedRole = undefined;
  }
}
