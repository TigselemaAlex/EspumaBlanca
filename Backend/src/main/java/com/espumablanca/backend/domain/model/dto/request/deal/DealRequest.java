package com.espumablanca.backend.domain.model.dto.request.deal;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DealRequest(
        @NotBlank String name,
        @NotNull BigDecimal value) {
}
