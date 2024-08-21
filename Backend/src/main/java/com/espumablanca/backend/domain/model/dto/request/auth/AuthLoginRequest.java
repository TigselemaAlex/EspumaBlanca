package com.espumablanca.backend.domain.model.dto.request.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AuthLoginRequest(
    @NotBlank
    @Size(min = 10, max = 10)
    String ci,
    @NotBlank
    @Size(min = 6, max = 20)
    String password
) {
}