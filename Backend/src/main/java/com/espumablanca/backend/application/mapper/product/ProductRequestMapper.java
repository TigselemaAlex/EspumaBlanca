package com.espumablanca.backend.application.mapper.product;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Product;
import com.espumablanca.backend.domain.model.dto.request.product.ProductRequest;

@Mapper(componentModel = "spring")
public interface ProductRequestMapper {

    @Mappings({
            @Mapping(target = "category", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "id", ignore = true),
    })
    Product toDomain(ProductRequest request);

}
