package com.espumablanca.backend.domain.model.dto.response.client;

public record ClientDto(
    Long id,
    String name,
    String lastname,
    String email,
    String phone,
    String address,
    String city,
    String ci,
    Boolean enabled
) {
}
