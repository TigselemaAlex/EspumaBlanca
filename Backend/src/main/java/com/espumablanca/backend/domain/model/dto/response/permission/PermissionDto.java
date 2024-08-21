package com.espumablanca.backend.domain.model.dto.response.permission;

import com.espumablanca.backend.common.util.enums.PermissionName;

public record PermissionDto(
    Long id,
    PermissionName name
) {
}