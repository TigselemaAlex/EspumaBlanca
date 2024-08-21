package com.espumablanca.backend.domain.model.dto.response.role;

import com.espumablanca.backend.common.util.enums.RoleName;

public record RoleWithoutPermissionsDto(
    Long id,
    RoleName name
) {

}