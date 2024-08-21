package com.espumablanca.backend.application.service;

import com.espumablanca.backend.application.mapper.client.ClientDtoMapper;
import com.espumablanca.backend.application.mapper.client.ClientRequestMapper;
import com.espumablanca.backend.application.usecase.ClientService;
import com.espumablanca.backend.domain.model.dto.request.client.ClientRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.client.ClientDto;
import com.espumablanca.backend.domain.model.dto.response.client.ClientFullNameDto;
import com.espumablanca.backend.domain.port.ClientPersistencePort;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientManagementService implements ClientService {

    private final ClientPersistencePort clientPersistencePort;
    private final ClientDtoMapper clientDtoMapper;
    private final ClientRequestMapper clientRequestMapper;

    @Override
    public ClientFullNameDto create(ClientRequest request) {
        var client = clientRequestMapper.toDomain(request);
        var createdClient = clientPersistencePort.create(client);
        return clientDtoMapper.toFullNameDto(createdClient);
    }

    @Override
    public ClientDto getById(Long id) {
        var client = clientPersistencePort.getById(id);
        return clientDtoMapper.toDto(client);
    }

    @Override
    public PageDto getAll(String value, Pageable pageable) {
        var clients = clientPersistencePort.getAll(value, null, pageable);
        var clientsDto = clients.map(clientDtoMapper::toFullNameDto);
        return new PageDto(clientsDto);
    }

    @Override
    public PageDto getAllEnabled(String value, Pageable pageable) {
        var clients = clientPersistencePort.getAll(value, true, pageable);
        var clientsDto = clients.map(clientDtoMapper::toFullNameDto);
        return new PageDto(clientsDto);
    }

    @Override
    public ClientDto update(Long id, ClientRequest request) {
        var clientToUpdate = clientPersistencePort.getById(id);
        clientToUpdate.setAddress(request.address());
        clientToUpdate.setCi(request.ci());
        clientToUpdate.setLastname(request.lastname());
        clientToUpdate.setName(request.name());
        clientToUpdate.setPhone(request.phone());
        clientToUpdate.setCity(request.city());
        clientToUpdate.setEmail(request.email());
        var updatedClient = clientPersistencePort.update(clientToUpdate);
        return clientDtoMapper.toDto(updatedClient);
    }

    @Override
    public void delete(Long id) {
        var client = clientPersistencePort.getById(id);
        clientPersistencePort.delete(client.getId());
    }

    @Override
    public void enable(Long id) {
        var client = clientPersistencePort.getById(id);
        clientPersistencePort.enable(client.getId());
    }

    @Override
    public void disable(Long id) {
        var client = clientPersistencePort.getById(id);
        clientPersistencePort.disable(client.getId());
    }
}
