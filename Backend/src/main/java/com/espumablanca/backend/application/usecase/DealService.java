package com.espumablanca.backend.application.usecase;

import org.springframework.data.domain.Pageable;

import com.espumablanca.backend.domain.model.dto.request.deal.DealRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.deal.DealDto;

public interface DealService {

    DealDto create(DealRequest request);

    DealDto getById(Long id);

    PageDto getAll(String name, Pageable pageable);

    PageDto getAllEnabled(String name, Pageable pageable);

    DealDto update(Long id, DealRequest request);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);

}
