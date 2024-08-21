package com.espumablanca.backend.domain.model.dto.response.product_category;

public record ProductCategoryDto(
    Long id,
    Boolean enabled,
    String name
) {
}