package com.espumablanca.backend.domain.model.dto.response.user;

public record UserDto(
    Long id,
    Boolean enabled,
    String name,
    String lastname,
    String fullName,
    String phone,
    String ci,
    String email
) {
}