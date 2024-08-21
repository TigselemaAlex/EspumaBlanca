package com.espumablanca.backend.infrastructure.adapter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.espumablanca.backend.domain.model.Deal;
import com.espumablanca.backend.domain.port.DealPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.DealDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.DealRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.DealSpecification;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DealSpringJpaAdapter implements DealPersistencePort {

    private final DealRepository dealRepository;
    private final DealDboMapper dealDboMapper;

    @Override
    public Deal create(Deal deal) {
        var dealToCreate = dealDboMapper.toEntity(deal);
        var dealCreated = dealRepository.save(dealToCreate);
        return dealDboMapper.toDomain(dealCreated);
    }

    @Override
    public Deal getById(Long id) {
        var deal = dealRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return dealDboMapper.toDomain(deal);
    }

    @Override
    public Page<Deal> getAll(String name, Boolean enabled, Pageable pageable) {
        return dealRepository.findAll(DealSpecification.withCustomFilter(name, enabled), pageable)
                .map(dealDboMapper::toDomain);
    }

    @Override
    public Deal update(Deal deal) {
        var dealToUpdate = dealDboMapper.toEntity(deal);
        var dealUpdated = dealRepository.save(dealToUpdate);
        return dealDboMapper.toDomain(dealUpdated);
    }

    @Override
    public void delete(Long id) {
        dealRepository.deleteById(id);
    }

    @Override
    public void enable(Long id) {
        dealRepository.enableById(id);
    }

    @Override
    public void disable(Long id) {
        dealRepository.disableById(id);
    }

}
