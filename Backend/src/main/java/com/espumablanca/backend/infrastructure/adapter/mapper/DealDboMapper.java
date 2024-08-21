package com.espumablanca.backend.infrastructure.adapter.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Deal;
import com.espumablanca.backend.infrastructure.adapter.entity.DealEntity;

@Mapper(componentModel = "spring")
public interface DealDboMapper {

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "createdAt", source = "createdAt"),
            @Mapping(target = "enabled", source = "enabled"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "value", source = "value")
    })
    DealEntity toEntity(Deal domain);

    @InheritInverseConfiguration(name = "toEntity")
    Deal toDomain(DealEntity entity);
}
