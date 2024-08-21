package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.laundry_service.LaundryServiceRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.laundry_service.LaundryServiceDto;
import org.springframework.data.domain.Pageable;

public interface Laundry_ServiceService {

    LaundryServiceDto create(LaundryServiceRequest request);

    LaundryServiceDto getById(Long id);

    PageDto getAll(String name, Pageable pageable);

    PageDto getAllEnabled(String name, Pageable pageable);

    LaundryServiceDto update(Long id, LaundryServiceRequest request);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}