package com.espumablanca.backend.application.mapper.product_category;

import com.espumablanca.backend.domain.model.ProductCategory;
import com.espumablanca.backend.domain.model.dto.request.product_category.ProductCategoryRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductCategoryRequestMapper {

    @Mapping(source = "name", target = "name")
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "products", ignore = true)
    ProductCategory toDomain(ProductCategoryRequest request);
}