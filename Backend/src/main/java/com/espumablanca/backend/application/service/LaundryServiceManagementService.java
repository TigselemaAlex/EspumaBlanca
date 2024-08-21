package com.espumablanca.backend.application.service;

import com.espumablanca.backend.application.mapper.laundry_service.LaundryServiceDtoMapper;
import com.espumablanca.backend.application.mapper.laundry_service.LaundryServiceRequestMapper;
import com.espumablanca.backend.application.usecase.Laundry_ServiceService;
import com.espumablanca.backend.domain.model.dto.request.laundry_service.LaundryServiceRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.laundry_service.LaundryServiceDto;
import com.espumablanca.backend.domain.port.LaundryServicePersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LaundryServiceManagementService implements Laundry_ServiceService {

    private final LaundryServicePersistencePort laundryServicePersistencePort;
    private final LaundryServiceDtoMapper laundryServiceDtoMapper;
    private final LaundryServiceRequestMapper laundryServiceRequestMapper;

    @Override
    public LaundryServiceDto create(LaundryServiceRequest request) {
        var serviceToCreate = laundryServiceRequestMapper.toDomain(request);
        var serviceCreated = laundryServicePersistencePort.create(serviceToCreate);
        return laundryServiceDtoMapper.toDto(serviceCreated);
    }

    @Override
    public LaundryServiceDto getById(Long id) {
        var service = laundryServicePersistencePort.getById(id);
        return laundryServiceDtoMapper.toDto(service);
    }

    @Override
    public PageDto getAll(String name, Pageable pageable) {
        var services = laundryServicePersistencePort.getAll(name, null, pageable);
        var servicesDto = services.map(laundryServiceDtoMapper::toDto);
        return new PageDto(servicesDto);
    }

    @Override
    public PageDto getAllEnabled(String name, Pageable pageable) {
        var services = laundryServicePersistencePort.getAll(name, Boolean.TRUE, pageable);
        var servicesDto = services.map(laundryServiceDtoMapper::toDto);
        return new PageDto(servicesDto);
    }

    @Override
    public LaundryServiceDto update(Long id, LaundryServiceRequest request) {
        var serviceToUpdate = laundryServicePersistencePort.getById(id);
        serviceToUpdate.setName(request.name());
        serviceToUpdate.setDescription(request.description());
        serviceToUpdate.setPrice(request.price());
        serviceToUpdate.setUnitType(request.unitType());
        var serviceUpdated = laundryServicePersistencePort.update(serviceToUpdate);
        return laundryServiceDtoMapper.toDto(serviceUpdated);
    }

    @Override
    public void delete(Long id) {
        var service = laundryServicePersistencePort.getById(id);
        laundryServicePersistencePort.delete(service.getId());
    }

    @Override
    public void enable(Long id) {
        var service = laundryServicePersistencePort.getById(id);
        laundryServicePersistencePort.enable(service.getId());
    }

    @Override
    public void disable(Long id) {
        var service = laundryServicePersistencePort.getById(id);
        laundryServicePersistencePort.disable(service.getId());
    }
}