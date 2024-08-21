package com.espumablanca.backend.domain.port;


import com.espumablanca.backend.domain.model.Permission;

import java.util.List;
import java.util.Set;

public interface PermissionPersistencePort {
    Permission create(Permission permission);

    List<Permission> getByIds(Set<Long> ids);

    List<Permission> getAll();
}