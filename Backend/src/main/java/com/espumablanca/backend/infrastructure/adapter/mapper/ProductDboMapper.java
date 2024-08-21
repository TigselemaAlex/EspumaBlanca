package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.Product;
import com.espumablanca.backend.infrastructure.adapter.entity.ProductEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = ProductCategoryDboMapper.class)
public interface ProductDboMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "enabled", target = "enabled"),
            @Mapping(source = "createdAt", target = "createdAt"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "stock", target = "stock"),
            @Mapping(source = "minStock", target = "minStock"),
            @Mapping(source = "category", target = "category")
    })
    ProductEntity toEntity(Product domain);

    @InheritInverseConfiguration(name = "toEntity")
    Product toDomain(ProductEntity entity);
}