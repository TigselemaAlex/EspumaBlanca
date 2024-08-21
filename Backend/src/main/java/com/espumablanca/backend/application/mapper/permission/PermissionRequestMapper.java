package com.espumablanca.backend.application.mapper.permission;

import com.espumablanca.backend.domain.model.Permission;
import com.espumablanca.backend.domain.model.dto.request.permission.PermissionRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PermissionRequestMapper {
    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Permission toDomain(PermissionRequest request);
}