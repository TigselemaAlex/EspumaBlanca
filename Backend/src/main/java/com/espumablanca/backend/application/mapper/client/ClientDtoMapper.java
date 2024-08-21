package com.espumablanca.backend.application.mapper.client;

import com.espumablanca.backend.domain.model.Client;
import com.espumablanca.backend.domain.model.dto.response.client.ClientDto;
import com.espumablanca.backend.domain.model.dto.response.client.ClientFullNameDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ClientDtoMapper {

    @Mapping(target = "id", source = "id")
    @Mapping(target = "fullName", expression = "java(domain.getName() + \" \" + domain.getLastname())")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "ci", source = "ci")
    @Mapping(target = "enabled", source = "enabled")
    ClientFullNameDto toFullNameDto(Client domain);

    @Mapping(target = "id", source = "id")
    @Mapping(target = "name", source = "name")
    @Mapping(target = "lastname", source = "lastname")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "phone", source = "phone")
    @Mapping(target = "address", source = "address")
    @Mapping(target = "city", source = "city")
    @Mapping(target = "ci", source = "ci")
    @Mapping(target = "enabled", source = "enabled")
    ClientDto toDto(Client domain);
}
