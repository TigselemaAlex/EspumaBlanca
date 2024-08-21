package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.Permission;
import com.espumablanca.backend.infrastructure.adapter.entity.PermissionEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface PermissionDboMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
    })
    PermissionEntity toEntity(Permission domain);

    @InheritInverseConfiguration(name = "toEntity")
    Permission toDomain(PermissionEntity entity);
}