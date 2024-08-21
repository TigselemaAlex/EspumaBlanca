package com.espumablanca.backend.domain.port;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.espumablanca.backend.domain.model.Deal;

public interface DealPersistencePort {
    Deal create(Deal deal);

    Deal getById(Long id);

    Page<Deal> getAll(String name, Boolean enabled, Pageable pageable);

    Deal update(Deal deal);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}
