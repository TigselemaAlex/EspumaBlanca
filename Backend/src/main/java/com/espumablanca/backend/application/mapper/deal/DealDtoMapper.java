package com.espumablanca.backend.application.mapper.deal;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Deal;
import com.espumablanca.backend.domain.model.dto.response.deal.DealDto;

@Mapper(componentModel = "spring")
public interface DealDtoMapper {

    @Mappings({
            @Mapping(target = "id", source = "id"),
            @Mapping(target = "enabled", source = "enabled"),
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "value", source = "value")
    })
    DealDto toDto(Deal domain);

}
