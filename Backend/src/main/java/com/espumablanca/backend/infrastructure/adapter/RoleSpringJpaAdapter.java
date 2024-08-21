package com.espumablanca.backend.infrastructure.adapter;


import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.domain.port.RolePersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.RoleDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.RoleRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class RoleSpringJpaAdapter implements RolePersistencePort {

    private final RoleRepository roleRepository;
    private final RoleDboMapper roleDboMapper;

    @Override
    public Role create(Role role) {
        var roleToCreate = roleDboMapper.toEntity(role);
        var roleCreated = roleRepository.save(roleToCreate);
        return roleDboMapper.toDomain(roleCreated);
    }

    @Override
    public Role getById(Long id) {
        var role = roleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return roleDboMapper.toDomain(role);
    }

    @Override
    public Role update(Role role) {
        var roleToUpdate = roleDboMapper.toEntity(role);
        var roleUpdated = roleRepository.save(roleToUpdate);
        return roleDboMapper.toDomain(roleUpdated);
    }

    @Override
    public List<Role> getByIds(Set<Long> ids) {
        return roleRepository.findAllByIdIn(ids)
            .stream()
            .map(roleDboMapper::toDomain)
            .toList();
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll(Sort.by("id"))
            .stream()
            .map(roleDboMapper::toDomain)
            .toList();
    }
}