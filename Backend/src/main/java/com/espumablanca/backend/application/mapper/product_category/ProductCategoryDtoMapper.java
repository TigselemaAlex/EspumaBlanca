package com.espumablanca.backend.application.mapper.product_category;

import com.espumablanca.backend.domain.model.ProductCategory;
import com.espumablanca.backend.domain.model.dto.response.product_category.ProductCategoryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ProductCategoryDtoMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "enabled", target = "enabled"),
            @Mapping(source = "name", target = "name")
    })
    ProductCategoryDto toDto(ProductCategory domain);

}