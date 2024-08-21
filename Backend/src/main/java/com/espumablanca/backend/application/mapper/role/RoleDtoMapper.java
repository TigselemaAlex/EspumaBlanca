package com.espumablanca.backend.application.mapper.role;

import com.espumablanca.backend.application.mapper.permission.PermissionDtoMapper;
import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.domain.model.dto.response.role.RoleDto;
import com.espumablanca.backend.domain.model.dto.response.role.RoleWithoutPermissionsDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


@Mapper(componentModel = "spring", uses = PermissionDtoMapper.class)
public interface RoleDtoMapper {

    @Mappings({
        @Mapping(source = "id", target = "id"),
        @Mapping(source = "name", target = "name"),
        @Mapping(source = "permissions", target = "permissions")
    })
    RoleDto toDto(Role domain);

    @Mappings({
        @Mapping(source = "id", target = "id"),
        @Mapping(source = "name", target = "name"),
    })
    RoleWithoutPermissionsDto toDtoWithoutPermissions(Role domain);
}