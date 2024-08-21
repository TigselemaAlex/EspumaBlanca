package com.espumablanca.backend.domain.model.dto.response.deal;

import java.math.BigDecimal;

public record DealDto(
                Long id,
                Boolean enabled,
                String name,
                BigDecimal value) {

}
