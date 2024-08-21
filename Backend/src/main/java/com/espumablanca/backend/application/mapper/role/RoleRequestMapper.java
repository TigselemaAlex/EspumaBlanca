package com.espumablanca.backend.application.mapper.role;

import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.domain.model.dto.request.role.RoleRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface RoleRequestMapper {

    @Mappings({
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "permissions", target = "permissions", ignore = true),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
    })
    Role toDomain(RoleRequest request);

}