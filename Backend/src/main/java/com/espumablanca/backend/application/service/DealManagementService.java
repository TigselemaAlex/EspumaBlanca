package com.espumablanca.backend.application.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.mapper.deal.DealDtoMapper;
import com.espumablanca.backend.application.mapper.deal.DealRequestMapper;
import com.espumablanca.backend.application.usecase.DealService;
import com.espumablanca.backend.domain.model.dto.request.deal.DealRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.deal.DealDto;
import com.espumablanca.backend.domain.port.DealPersistencePort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DealManagementService implements DealService {

    private final DealPersistencePort dealPersistencePort;
    private final DealDtoMapper dealDtoMapper;
    private final DealRequestMapper dealRequestMapper;

    @Override
    public DealDto create(DealRequest request) {
        var dealToCreate = dealRequestMapper.toDomain(request);
        var dealCreated = dealPersistencePort.create(dealToCreate);
        return dealDtoMapper.toDto(dealCreated);
    }

    @Override
    public DealDto getById(Long id) {
        var deal = dealPersistencePort.getById(id);
        return dealDtoMapper.toDto(deal);
    }

    @Override
    public PageDto getAll(String name, Pageable pageable) {
        var deals = dealPersistencePort.getAll(name, null, pageable);
        var dealsDto = deals.map(dealDtoMapper::toDto);
        return new PageDto(dealsDto);
    }

    @Override
    public PageDto getAllEnabled(String name, Pageable pageable) {
        var deals = dealPersistencePort.getAll(name, true, pageable);
        var dealsDto = deals.map(dealDtoMapper::toDto);
        return new PageDto(dealsDto);
    }

    @Override
    public DealDto update(Long id, DealRequest request) {
        var dealToUpdate = dealPersistencePort.getById(id);
        dealToUpdate.setName(request.name());
        dealToUpdate.setValue(request.value());
        var dealUpdated = dealPersistencePort.update(dealToUpdate);
        return dealDtoMapper.toDto(dealUpdated);
    }

    @Override
    public void delete(Long id) {
        var deal = dealPersistencePort.getById(id);
        dealPersistencePort.delete(deal.getId());
    }

    @Override
    public void enable(Long id) {
        var deal = dealPersistencePort.getById(id);
        dealPersistencePort.enable(deal.getId());
    }

    @Override
    public void disable(Long id) {
        var deal = dealPersistencePort.getById(id);
        dealPersistencePort.disable(deal.getId());
    }

}
