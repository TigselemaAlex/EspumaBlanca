package com.espumablanca.backend.domain.model.dto.request.laundry_service;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record LaundryServiceRequest(
    @NotBlank
    String name,
    String description,
    @NotNull
    @DecimalMin(value = "0.0")
    BigDecimal price,
    String unitType
) {
}