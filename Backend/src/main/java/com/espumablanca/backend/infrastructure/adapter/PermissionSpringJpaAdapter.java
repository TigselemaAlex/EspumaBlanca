package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.Permission;
import com.espumablanca.backend.domain.port.PermissionPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.PermissionDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;


@Service
@Transactional
@RequiredArgsConstructor
public class PermissionSpringJpaAdapter implements PermissionPersistencePort {

    private final PermissionRepository permissionRepository;
    private final PermissionDboMapper permissionDboMapper;

    @Override
    public Permission create(Permission permission) {
        var permissionToCreate = permissionDboMapper.toEntity(permission);
        var permissionCreated = permissionRepository.save(permissionToCreate);
        return permissionDboMapper.toDomain(permissionCreated);
    }

    @Override
    public List<Permission> getByIds(Set<Long> ids) {
        return permissionRepository.findByIdIn(ids)
            .stream()
            .map(permissionDboMapper::toDomain)
            .toList();
    }

    @Override
    public List<Permission> getAll() {
        return permissionRepository.findAll(Sort.by("id"))
            .stream()
            .map(permissionDboMapper::toDomain)
            .toList();
    }
}