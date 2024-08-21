package com.espumablanca.backend.application.mapper.profile;

import com.espumablanca.backend.application.mapper.role.RoleDtoMapper;
import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.model.dto.response.profile.ProfileDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = RoleDtoMapper.class)
public interface ProfileDtoMapper {
    @Mappings(
        {
            @Mapping(source = "id", target = "id"),
            @Mapping(source = "name", target = "name"),
            @Mapping(source = "lastname", target = "lastname"),
            @Mapping(source = "ci", target = "ci"),
            @Mapping(source = "email", target = "email"),
            @Mapping(source = "phone", target = "phone"),
            @Mapping(source = "roles", target = "roles")
        }
    )
    ProfileDto toDto(User domain);
}