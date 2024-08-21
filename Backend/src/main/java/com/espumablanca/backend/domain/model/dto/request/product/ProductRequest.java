package com.espumablanca.backend.domain.model.dto.request.product;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequest(
                @NotBlank String name,
                String description,
                @NotNull Integer stock,
                @NotNull Integer minStock,
                @NotNull Long category) {
}