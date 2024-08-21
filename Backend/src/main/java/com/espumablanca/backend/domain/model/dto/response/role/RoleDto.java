package com.espumablanca.backend.domain.model.dto.response.role;

import com.espumablanca.backend.common.util.enums.RoleName;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionDto;

import java.util.Set;

public record RoleDto(
    Long id,
    RoleName name,
    Set<PermissionDto> permissions
) {
}