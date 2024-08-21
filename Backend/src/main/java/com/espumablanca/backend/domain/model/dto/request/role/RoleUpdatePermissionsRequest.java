package com.espumablanca.backend.domain.model.dto.request.role;

import jakarta.validation.constraints.NotNull;

import java.util.Set;

public record RoleUpdatePermissionsRequest(
    @NotNull
    Set<Long> permissions
) {
}