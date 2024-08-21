package com.espumablanca.backend.domain.model.dto.request.permission;

import com.espumablanca.backend.common.util.enums.PermissionName;
import jakarta.validation.constraints.NotNull;

public record PermissionRequest(
    @NotNull
    PermissionName name
) {
}