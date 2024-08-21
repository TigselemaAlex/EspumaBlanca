package com.espumablanca.backend.infrastructure.adapter.generator;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.usecase.PermissionService;
import com.espumablanca.backend.application.usecase.RoleService;
import com.espumablanca.backend.application.usecase.UserService;
import com.espumablanca.backend.common.util.enums.PermissionName;
import com.espumablanca.backend.common.util.enums.RoleName;
import com.espumablanca.backend.domain.model.dto.request.permission.PermissionRequest;
import com.espumablanca.backend.domain.model.dto.request.role.RoleRequest;
import com.espumablanca.backend.domain.model.dto.request.user.UserRequest;
import com.espumablanca.backend.domain.model.dto.request.user.UserUpdateRolesRequest;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataGeneratorService {

    private final PermissionService permissionService;
    private final RoleService roleService;
    private final UserService userService;

    public void generatePermissions() {
        List<PermissionName> permissions = Arrays.asList(PermissionName.values());
        permissions.forEach(
                name -> permissionService.create(new PermissionRequest(name)));
    }

    public void generateSuperAdminRole() {
        var permissionsIds = permissionService.getAll().stream().map(PermissionDto::id).collect(Collectors.toSet());
        var roleRequest = new RoleRequest(RoleName.SUPER_ADMIN, permissionsIds);
        roleService.create(roleRequest);
    }

    public void generateOwnerRole() {
        var roleRequest = new RoleRequest(RoleName.OWNER, Set.of(
                1L, 2L, 3L, 4L, 5L));
        roleService.create(roleRequest);
    }

    public void generateOtherRoles() {
        var roleManager = new RoleRequest(RoleName.MANAGER, Set.of(
                11L, 12L, 13L, 14L, 15L));
        roleService.create(roleManager);
        var roleSeller = new RoleRequest(RoleName.SELLER, Set.of(
                11L, 12L, 13L, 14L, 15L));
        roleService.create(roleSeller);

    }

    public void generateSuperAdminUser() {
        var userRequest = new UserRequest("Alex", "Tigselema", "1803834371", "alextp.dev@gmail.com", "0967205537");
        var superAdminRole = roleService.getById(1L);
        var userCreated = userService.create(userRequest);
        var userUpdateRoleRequest = new UserUpdateRolesRequest(new HashSet<>(
                Set.of(superAdminRole.id())));
        userService.updateRoles(userCreated.id(), userUpdateRoleRequest);
    }

    public void generateOwnerUser() {
        var userRequest = new UserRequest("Adriana", "Silva", "9999999999", "adriana@correo.com", "0988367559");
        var ownerRole = roleService.getById(2L);
        var userCreated = userService.create(userRequest);
        var userUpdateRoleRequest = new UserUpdateRolesRequest(new HashSet<>(
                Set.of(ownerRole.id())));
        userService.updateRoles(userCreated.id(), userUpdateRoleRequest);
    }

}