package com.espumablanca.backend.application.service;

import com.espumablanca.backend.application.mapper.permission.PermissionDtoMapper;
import com.espumablanca.backend.application.mapper.permission.PermissionRequestMapper;
import com.espumablanca.backend.application.usecase.PermissionService;
import com.espumablanca.backend.domain.model.dto.request.permission.PermissionRequest;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionDto;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionInRoleDto;
import com.espumablanca.backend.domain.port.PermissionPersistencePort;
import com.espumablanca.backend.domain.port.RolePersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PermissionManagementService implements PermissionService {

    private final PermissionPersistencePort permissionPersistencePort;
    private final RolePersistencePort rolePersistencePort;
    private final PermissionDtoMapper permissionDtoMapper;
    private final PermissionRequestMapper permissionRequestMapper;

    @Override
    public PermissionDto create(PermissionRequest request) {
        var permissionToCreate = permissionRequestMapper.toDomain(request);
        var permissionCreated = permissionPersistencePort.create(permissionToCreate);
        return permissionDtoMapper.toDto(permissionCreated);
    }

    @Override
    public List<PermissionDto> getAll() {
        return permissionPersistencePort.getAll()
            .stream()
            .map(permissionDtoMapper::toDto)
            .toList();
    }

    @Override
    public List<PermissionInRoleDto> getAllByRoleId(Long roleId) {
        var role = rolePersistencePort.getById(roleId);
        var rolePermissions = role.getPermissions();
        var allPermissions = permissionPersistencePort.getAll();
        return allPermissions
            .stream()
            .map(
                permission -> new PermissionInRoleDto(
                    permission.getId(),
                    permission.getName(),
                    rolePermissions.stream().anyMatch(
                        rolePermission ->
                            rolePermission.getId().equals(permission.getId())
                    )
                )
            )
            .toList();
    }
}