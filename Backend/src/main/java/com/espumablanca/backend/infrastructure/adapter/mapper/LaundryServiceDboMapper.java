package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.LaundryService;
import com.espumablanca.backend.infrastructure.adapter.entity.LaundryServiceEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface LaundryServiceDboMapper {

    @Mappings({
        @Mapping(source = "id", target = "id"),
        @Mapping(source = "createdAt", target = "createdAt"),
        @Mapping(source = "enabled", target = "enabled"),
        @Mapping(source = "name", target = "name"),
        @Mapping(source = "description", target = "description"),
        @Mapping(source = "price", target = "price"),
        @Mapping(source = "unitType", target = "unitType")
    })
    LaundryServiceEntity toEntity(LaundryService domain);

    @InheritInverseConfiguration(name = "toEntity")
    LaundryService toDomain(LaundryServiceEntity entity);

}