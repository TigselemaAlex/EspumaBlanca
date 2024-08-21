package com.espumablanca.backend.domain.model.dto.request.client;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record ClientRequest(
    @NotBlank
    String name,
    @NotBlank
    String lastname,
    @NotBlank
    @Email
    String email,
    @NotBlank
    String phone,
    String address,
    String city,
    @NotBlank
    String ci
) {
}
