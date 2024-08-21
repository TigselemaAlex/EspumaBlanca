package com.espumablanca.backend.domain.model.dto.request.user;

import jakarta.validation.constraints.NotBlank;

public record UserRequest(
    @NotBlank
    String name,
    @NotBlank
    String lastname,
    @NotBlank
    String ci,
    String email,
    @NotBlank
    String phone
) {
}