package com.espumablanca.backend.domain.model.dto.request.profile;

import jakarta.validation.constraints.NotBlank;

public record ProfileRequest(
        @NotBlank String name,
        @NotBlank String lastname,
        String email) {
}