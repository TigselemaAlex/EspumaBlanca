package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.LaundryService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LaundryServicePersistencePort {

    LaundryService create(LaundryService service);

    LaundryService getById(Long id);

    Page<LaundryService> getAll(String name, Boolean enabled, Pageable pageable);

    LaundryService update(LaundryService service);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);

}