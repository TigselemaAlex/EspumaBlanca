package com.espumablanca.backend.application.service;

import java.util.HashSet;
import java.util.Objects;

import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.mapper.user.UserDtoMapper;
import com.espumablanca.backend.application.mapper.user.UserRequestMapper;
import com.espumablanca.backend.application.usecase.UserService;
import com.espumablanca.backend.common.util.utils.PasswordUtils;
import com.espumablanca.backend.domain.model.Role;
import com.espumablanca.backend.domain.model.dto.request.user.UserRequest;
import com.espumablanca.backend.domain.model.dto.request.user.UserUpdateRolesRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.user.UserDto;
import com.espumablanca.backend.domain.port.RolePersistencePort;
import com.espumablanca.backend.domain.port.UserPersistencePort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserManagementService implements UserService {

    private final UserPersistencePort userPersistencePort;
    private final RolePersistencePort rolePersistencePort;
    private final UserDtoMapper userDtoMapper;
    private final UserRequestMapper userRequestMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto create(UserRequest request) {
        var user = userRequestMapper.toDomail(request);
        user.setPassword(passwordEncoder.encode(PasswordUtils.passwordGenerate("123456")));
        var userCreated = userPersistencePort.create(user);
        return userDtoMapper.toDto(userCreated);
    }

    @Override
    public UserDto getById(Long id) {
        var user = userPersistencePort.getById(id);
        return userDtoMapper.toDto(user);
    }

    @Override
    public PageDto getAll(String value, Long roleId, Pageable pageable) {
        Role role = null;
        if (Objects.nonNull(roleId)) {
            role = rolePersistencePort.getById(roleId);
        }
        var users = userPersistencePort.getAll(value, role, null, pageable);
        return new PageDto(users);
    }

    @Override
    public PageDto getAllEnabled(String value, Long roleId, Pageable pageable) {
        Role role = null;
        if (Objects.nonNull(roleId)) {
            role = rolePersistencePort.getById(roleId);
        }
        var users = userPersistencePort.getAll(value, role, Boolean.TRUE, pageable);
        return new PageDto(users);
    }

    @Override
    public UserDto update(Long id, UserRequest request) {
        var userToUpdate = userPersistencePort.getById(id);
        userToUpdate.setCi(request.ci());
        userToUpdate.setEmail(request.email());
        userToUpdate.setName(request.name());
        userToUpdate.setLastname(request.lastname());
        userToUpdate.setPhone(request.phone());
        var userUpdated = userPersistencePort.update(userToUpdate);
        return userDtoMapper.toDto(userUpdated);
    }

    @Override
    public UserDto updateRoles(Long id, UserUpdateRolesRequest request) {
        var roles = rolePersistencePort.getByIds(request.roles());
        var userToUpdate = userPersistencePort.getById(id);
        userToUpdate.addRoles(new HashSet<>(roles));
        var userUpdated = userPersistencePort.update(userToUpdate);
        return userDtoMapper.toDto(userUpdated);
    }

    @Override
    public void delete(Long id) {
        var user = userPersistencePort.getById(id);
        userPersistencePort.delete(user.getId());
    }

    @Override
    public void disable(Long id) {
        var user = userPersistencePort.getById(id);
        userPersistencePort.disable(user.getId());
    }

    @Override
    public void enable(Long id) {
        var user = userPersistencePort.getById(id);
        userPersistencePort.enable(user.getId());
    }
}