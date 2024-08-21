package com.espumablanca.backend.application.mapper.profile;

import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ProfileRequestMapper {

    @Mappings({
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "lastname", target = "lastname"),
            @Mapping(source = "email", target = "email"),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "ci", ignore = true),
            @Mapping(target = "phone", ignore = true),
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "roles", ignore = true),
    })
    User toDomain(ProfileRequest request);
}