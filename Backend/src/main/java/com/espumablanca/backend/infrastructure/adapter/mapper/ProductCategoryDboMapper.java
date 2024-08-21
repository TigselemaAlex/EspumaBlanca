package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.ProductCategory;
import com.espumablanca.backend.infrastructure.adapter.entity.ProductCategoryEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ProductCategoryDboMapper {

        @Mappings({
                        @Mapping(source = "id", target = "id"),
                        @Mapping(source = "createdAt", target = "createdAt"),
                        @Mapping(source = "name", target = "name"),
        })
        ProductCategoryEntity toEntity(ProductCategory domain);

        @InheritInverseConfiguration(name = "toEntity")
        @Mapping(target = "products", ignore = true)
        ProductCategory toDomain(ProductCategoryEntity entity);

}