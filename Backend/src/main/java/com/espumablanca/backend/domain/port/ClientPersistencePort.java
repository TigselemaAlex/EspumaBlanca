package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ClientPersistencePort {
    Client create(Client client);

    Client getById(Long id);

    Page<Client> getAll(String value, Boolean enabled, Pageable pageable);

    Client update(Client client);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}
