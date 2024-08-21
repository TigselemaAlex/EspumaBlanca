package com.espumablanca.backend.application.mapper.laundry_service;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.espumablanca.backend.domain.model.LaundryService;
import com.espumablanca.backend.domain.model.dto.request.laundry_service.LaundryServiceRequest;

@Mapper(componentModel = "spring")
public interface LaundryServiceRequestMapper {

    @Mapping(target = "enabled", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    LaundryService toDomain(LaundryServiceRequest request);
}