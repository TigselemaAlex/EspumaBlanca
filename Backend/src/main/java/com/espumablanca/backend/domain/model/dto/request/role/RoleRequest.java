package com.espumablanca.backend.domain.model.dto.request.role;

import com.espumablanca.backend.common.util.enums.RoleName;

import java.util.Set;

public record RoleRequest(
    RoleName name,
    Set<Long> permissions
) {
}