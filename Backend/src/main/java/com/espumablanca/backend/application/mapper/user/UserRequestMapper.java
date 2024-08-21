package com.espumablanca.backend.application.mapper.user;

import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.model.dto.request.user.UserRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserRequestMapper {

    @Mappings({
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "lastname", target = "lastname"),
            @Mapping(source = "ci", target = "ci"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "id", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "password", ignore = true),
            @Mapping(target = "roles", ignore = true),
    })
    User toDomail(UserRequest request);
}