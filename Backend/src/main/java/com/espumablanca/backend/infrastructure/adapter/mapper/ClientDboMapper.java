package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.Client;
import com.espumablanca.backend.infrastructure.adapter.entity.ClientEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface ClientDboMapper {

    @Mappings({
        @Mapping(source = "id", target = "id"),
        @Mapping(source = "name", target = "name"),
        @Mapping(source = "lastname", target = "lastname"),
        @Mapping(source = "email", target = "email"),
        @Mapping(source = "phone", target = "phone"),
        @Mapping(source = "address", target = "address"),
        @Mapping(source = "city", target = "city"),
        @Mapping(source = "ci", target = "ci"),
        @Mapping(source = "enabled", target = "enabled"),
        @Mapping(source = "createdAt", target = "createdAt")
    })
    ClientEntity toEntity(Client domain);

    @InheritInverseConfiguration(name = "toEntity")
    Client toDomain(ClientEntity entity);
}
