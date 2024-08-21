package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.infrastructure.adapter.entity.UserEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface UserDboMapper {

        @Mappings({
                        @Mapping(source = "id", target = "id"),
                        @Mapping(source = "name", target = "name"),
                        @Mapping(source = "lastname", target = "lastname"),
                        @Mapping(source = "ci", target = "ci"),
                        @Mapping(source = "password", target = "password"),
                        @Mapping(source = "email", target = "email"),
                        @Mapping(source = "phone", target = "phone"),

        })
        UserEntity toEntity(User domain);

        @InheritInverseConfiguration(name = "toEntity")
        User toDomain(UserEntity entity);

        @Mappings({
                        @Mapping(source = "id", target = "id"),
                        @Mapping(source = "name", target = "name"),
                        @Mapping(source = "lastname", target = "lastname"),
                        @Mapping(source = "ci", target = "ci"),
                        @Mapping(source = "password", target = "password"),
                        @Mapping(source = "email", target = "email"),
                        @Mapping(source = "phone", target = "phone"),
        })
        UserEntity toEntityWithPassword(User domain);
}