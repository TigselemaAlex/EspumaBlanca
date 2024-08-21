package com.espumablanca.backend.application.mapper.deal;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.espumablanca.backend.domain.model.Deal;
import com.espumablanca.backend.domain.model.dto.request.deal.DealRequest;

@Mapper(componentModel = "spring")
public interface DealRequestMapper {

    @Mappings({
            @Mapping(target = "name", source = "name"),
            @Mapping(target = "value", source = "value"),
            @Mapping(target = "enabled", ignore = true),
            @Mapping(target = "createdAt", ignore = true),
            @Mapping(target = "updatedAt", ignore = true),
            @Mapping(target = "id", ignore = true),

    })
    Deal toDomain(DealRequest request);
}
