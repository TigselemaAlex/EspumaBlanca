package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.client.ClientRequest;
import com.espumablanca.backend.domain.model.dto.response.client.ClientDto;
import com.espumablanca.backend.domain.model.dto.response.client.ClientFullNameDto;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import org.springframework.data.domain.Pageable;


public interface ClientService {

    ClientFullNameDto create(ClientRequest request);

    ClientDto getById(Long id);

    PageDto getAll(String value, Pageable pageable);

    PageDto getAllEnabled(String value, Pageable pageable);

    ClientDto update(Long id, ClientRequest request);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}
