package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.Role;

import java.util.List;
import java.util.Set;

public interface RolePersistencePort {

    Role create(Role role);

    Role getById(Long id);

    Role update(Role role);

    List<Role> getByIds(Set<Long> ids);

    List<Role> getAll();

}