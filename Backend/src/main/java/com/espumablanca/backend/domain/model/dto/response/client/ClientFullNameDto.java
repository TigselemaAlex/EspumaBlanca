package com.espumablanca.backend.domain.model.dto.response.client;

public record ClientFullNameDto(
    Long id,
    String fullName,
    String email,
    String phone,
    String address,
    String city,
    String ci,
    Boolean enabled
) {
}
