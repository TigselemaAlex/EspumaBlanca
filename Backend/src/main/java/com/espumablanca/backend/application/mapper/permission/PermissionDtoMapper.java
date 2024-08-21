package com.espumablanca.backend.application.mapper.permission;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Permission;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionDto;

@Mapper(componentModel = "spring")
public interface PermissionDtoMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name")
    })
    PermissionDto toDto(Permission domain);
}