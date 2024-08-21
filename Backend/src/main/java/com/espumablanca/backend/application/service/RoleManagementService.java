package com.espumablanca.backend.application.service;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.mapper.role.RoleDtoMapper;
import com.espumablanca.backend.application.mapper.role.RoleRequestMapper;
import com.espumablanca.backend.application.usecase.RoleService;
import com.espumablanca.backend.domain.model.dto.request.role.RoleRequest;
import com.espumablanca.backend.domain.model.dto.request.role.RoleUpdatePermissionsRequest;
import com.espumablanca.backend.domain.model.dto.response.role.RoleDto;
import com.espumablanca.backend.domain.port.PermissionPersistencePort;
import com.espumablanca.backend.domain.port.RolePersistencePort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleManagementService implements RoleService {

    private final RolePersistencePort rolePersistencePort;
    private final PermissionPersistencePort permissionPersistencePort;
    private final RoleDtoMapper roleDtoMapper;
    private final RoleRequestMapper roleRequestMapper;

    @Override
    public RoleDto create(RoleRequest request) {
        var roleToCreate = roleRequestMapper.toDomain(request);
        var permissions = permissionPersistencePort.getByIds(request.permissions());
        roleToCreate.addPermissions(new HashSet<>(permissions));
        var roleCreated = rolePersistencePort.create(roleToCreate);
        return roleDtoMapper.toDto(roleCreated);
    }

    @Override
    public RoleDto getById(Long id) {
        var role = rolePersistencePort.getById(id);
        return roleDtoMapper.toDto(role);
    }

    @Override
    public List<RoleDto> getAll() {
        return rolePersistencePort.getAll()
                .stream()
                .map(roleDtoMapper::toDto)
                .toList();
    }

    @Override
    public RoleDto updatePermissions(Long id, RoleUpdatePermissionsRequest request) {
        var roleToUpdatePermissions = rolePersistencePort.getById(id);
        var permissions = permissionPersistencePort.getByIds(request.permissions());
        roleToUpdatePermissions.getPermissions().clear();
        roleToUpdatePermissions.addPermissions(new HashSet<>(permissions));
        var roleUpdatedPermissions = rolePersistencePort.update(roleToUpdatePermissions);
        return roleDtoMapper.toDto(roleUpdatedPermissions);
    }

}