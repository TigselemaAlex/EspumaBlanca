package com.espumablanca.backend.domain.model.dto.response.profile;

import com.espumablanca.backend.domain.model.dto.response.role.RoleWithoutPermissionsDto;

import java.util.List;

public record ProfileDto(
    Long id,
    String name,
    String lastname,
    String phone,
    String ci,
    String email,
    List<RoleWithoutPermissionsDto> roles
) {

}