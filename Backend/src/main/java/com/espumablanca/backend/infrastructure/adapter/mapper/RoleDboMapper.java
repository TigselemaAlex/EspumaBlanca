package com.espumablanca.backend.infrastructure.adapter.mapper;

import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.infrastructure.adapter.entity.RoleEntity;

@Mapper(componentModel = "spring")
public interface RoleDboMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "permissions", target = "permissions")
    })
    RoleEntity toEntity(Role domain);

    @InheritInverseConfiguration(name = "toEntity")
    Role toDomain(RoleEntity entity);

}