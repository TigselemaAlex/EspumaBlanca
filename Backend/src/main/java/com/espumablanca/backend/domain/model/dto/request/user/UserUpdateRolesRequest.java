package com.espumablanca.backend.domain.model.dto.request.user;

import java.util.Set;

public record UserUpdateRolesRequest(
    Set<Long> roles
) {
}