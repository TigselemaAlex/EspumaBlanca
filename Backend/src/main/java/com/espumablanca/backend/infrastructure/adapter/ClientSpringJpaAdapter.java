package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.Client;
import com.espumablanca.backend.domain.port.ClientPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.ClientDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.ClientRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.ClientSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ClientSpringJpaAdapter implements ClientPersistencePort {

    private final ClientRepository clientRepository;
    private final ClientDboMapper clientDboMapper;

    @Override
    public Client create(Client client) {
        var clientToSave = clientDboMapper.toEntity(client);
        var savedClient = clientRepository.save(clientToSave);
        return clientDboMapper.toDomain(savedClient);
    }

    @Override
    @Transactional(readOnly = true)
    public Client getById(Long id) {
        var optionalClient = clientRepository.findById(id);
        return optionalClient.map(clientDboMapper::toDomain).orElseThrow(EntityNotFoundException::new);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Client> getAll(String value, Boolean enabled, Pageable pageable) {
        return clientRepository.findAll(ClientSpecification.withCustomFilter(value, enabled), pageable)
            .map(clientDboMapper::toDomain);
    }

    @Override
    public Client update(Client client) {
        var clientToUpdate = clientDboMapper.toEntity(client);
        var clientUpdated = clientRepository.save(clientToUpdate);
        return clientDboMapper.toDomain(clientUpdated);
    }

    @Override
    public void delete(Long id) {
        clientRepository.deleteById(id);
    }

    @Override
    public void enable(Long id) {
        clientRepository.enableById(id);
    }

    @Override
    public void disable(Long id) {
        clientRepository.disableById(id);
    }
}
