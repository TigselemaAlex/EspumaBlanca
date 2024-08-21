package com.espumablanca.backend.domain.model.dto.response.laundry_service;

import java.math.BigDecimal;

public record LaundryServiceDto(
    Long id,
    Boolean enabled,
    String name,
    String description,
    BigDecimal price,
    String unitType
) {
}