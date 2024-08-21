package com.espumablanca.backend.domain.model.dto.response.product;

import com.espumablanca.backend.domain.model.dto.response.product_category.ProductCategoryDto;

public record ProductDto(
        Long id,
        Boolean enabled,
        String name,
        String description,
        Integer stock,
        Integer minStock,
        ProductCategoryDto category) {
}