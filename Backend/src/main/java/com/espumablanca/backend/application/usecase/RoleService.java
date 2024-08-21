package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.role.RoleRequest;
import com.espumablanca.backend.domain.model.dto.request.role.RoleUpdatePermissionsRequest;
import com.espumablanca.backend.domain.model.dto.response.role.RoleDto;

import java.util.List;

public interface RoleService {
    RoleDto create(RoleRequest request);

    RoleDto getById(Long id);

    List<RoleDto> getAll();

    RoleDto updatePermissions(Long id, RoleUpdatePermissionsRequest request);
}