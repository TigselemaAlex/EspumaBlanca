package com.espumablanca.backend.application.mapper.user;

import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.model.dto.response.user.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserDtoMapper {

    @Mappings({
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "lastname", target = "lastname"),
            @Mapping(source = "ci", target = "ci"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(expression = "java(name + lastname)", target = "fullName"),
    })
    UserDto toDto(User domain);
}