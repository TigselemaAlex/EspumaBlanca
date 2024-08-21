package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.LaundryService;
import com.espumablanca.backend.domain.port.LaundryServicePersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.LaundryServiceDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.LaundryServiceRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.LaundryServiceEspecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LaundryServiceSpringJpaAdapter implements LaundryServicePersistencePort {

    private final LaundryServiceRepository laundryServiceRepository;
    private final LaundryServiceDboMapper laundryServiceDboMapper;

    @Override
    public LaundryService create(LaundryService service) {
        var serviceToCreate = laundryServiceDboMapper.toEntity(service);
        var serviceCreated = laundryServiceRepository.save(serviceToCreate);
        return laundryServiceDboMapper.toDomain(serviceCreated);
    }

    @Override
    @Transactional(readOnly = true)
    public LaundryService getById(Long id) {
        var service = laundryServiceRepository.findById(id)
            .orElseThrow(EntityNotFoundException::new);
        return laundryServiceDboMapper.toDomain(service);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<LaundryService> getAll(String name, Boolean enabled, Pageable pageable) {
        return laundryServiceRepository
            .findAll(LaundryServiceEspecification.withCustomFilter(name, enabled), pageable)
            .map(laundryServiceDboMapper::toDomain);
    }

    @Override
    public LaundryService update(LaundryService service) {
        var serviceToUpdate = laundryServiceDboMapper.toEntity(service);
        var serviceUpdated = laundryServiceRepository.save(serviceToUpdate);
        return laundryServiceDboMapper.toDomain(serviceUpdated);
    }

    @Override
    public void delete(Long id) {
        laundryServiceRepository.deleteById(id);
    }

    @Override
    public void enable(Long id) {
        laundryServiceRepository.enableById(id);
    }

    @Override
    public void disable(Long id) {
        laundryServiceRepository.disableById(id);
    }
}