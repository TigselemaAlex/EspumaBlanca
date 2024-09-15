package com.espumablanca.backend.domain.model.dto.request.profile;

import jakarta.validation.constraints.NotBlank;

public record ProfileUpdatePasswordRequest(
        @NotBlank String password) {
}