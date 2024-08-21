package com.espumablanca.backend.application.mapper.product;

import com.espumablanca.backend.application.mapper.product_category.ProductCategoryDtoMapper;
import com.espumablanca.backend.domain.model.Product;
import com.espumablanca.backend.domain.model.dto.response.product.ProductDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = ProductCategoryDtoMapper.class)
public interface ProductDtoMapper {

    @Mappings({
            @Mapping(source = "category", target = "category"),
    })
    ProductDto toDto(Product domain);

}