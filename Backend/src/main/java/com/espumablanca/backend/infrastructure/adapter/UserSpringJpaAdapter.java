package com.espumablanca.backend.infrastructure.adapter;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.domain.model.User;
import com.espumablanca.backend.domain.port.UserPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.RoleDboMapper;
import com.espumablanca.backend.infrastructure.adapter.mapper.UserDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.UserRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.AuthSpecification;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserSpringJpaAdapter implements UserPersistencePort {

    private final UserRepository authRepository;
    private final UserDboMapper authDboMapper;
    private final RoleDboMapper roleDboMapper;

    @Override
    public User create(User user) {
        var userToSave = authDboMapper.toEntity(user);
        var userSaved = authRepository.save(userToSave);
        return authDboMapper.toDomain(userSaved);
    }

    @Override
    @Transactional(readOnly = true)
    public User getById(Long id) {
        var entity = authRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return authDboMapper.toDomain(entity);
    }

    @Override
    public User update(User user) {
        var userToUpdate = authDboMapper.toEntity(user);
        var userUpdated = authRepository.save(userToUpdate);
        return authDboMapper.toDomain(userUpdated);
    }

    @Override
    public User updatePassword(User user) {
        var userToUpdatePassword = authDboMapper.toEntityWithPassword(user);
        var userUpdatedPassword = authRepository.save(userToUpdatePassword);
        return authDboMapper.toDomain(userUpdatedPassword);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<User> getAll(String value, Role role, Boolean enabled, Pageable pageable) {
        var roleEntity = roleDboMapper.toEntity(role);
        return authRepository
                .findAll(AuthSpecification.withCustomFilter(value, roleEntity, enabled), pageable)
                .map(authDboMapper::toDomain);
    }

    @Override
    public void delete(Long id) {
        authRepository.deleteById(id);
    }

    @Override
    public void disable(Long id) {
        authRepository.disableById(id);
    }

    @Override
    public void enable(Long id) {
        authRepository.enableById(id);
    }

}