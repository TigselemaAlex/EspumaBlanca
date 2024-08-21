package com.espumablanca.backend.domain.model.dto.response.permission;

import com.espumablanca.backend.common.util.enums.PermissionName;

public record PermissionInRoleDto(
    Long id,
    PermissionName name,
    Boolean assigned
) {
}