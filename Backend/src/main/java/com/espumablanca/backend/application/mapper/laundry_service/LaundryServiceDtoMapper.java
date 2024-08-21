package com.espumablanca.backend.application.mapper.laundry_service;

import org.mapstruct.Mapper;

import com.espumablanca.backend.domain.model.LaundryService;
import com.espumablanca.backend.domain.model.dto.response.laundry_service.LaundryServiceDto;

@Mapper(componentModel = "spring")
public interface LaundryServiceDtoMapper {

    LaundryServiceDto toDto(LaundryService domain);

}