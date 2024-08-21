package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.user.UserRequest;
import com.espumablanca.backend.domain.model.dto.request.user.UserUpdateRolesRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.user.UserDto;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDto create(UserRequest request);

    UserDto getById(Long id);

    PageDto getAll(String value, Long roleId, Pageable pageable);

    PageDto getAllEnabled(String value, Long roleId, Pageable pageable);

    UserDto update(Long id, UserRequest request);
    
    UserDto updateRoles(Long id, UserUpdateRolesRequest request);

    void delete(Long id);

    void disable(Long id);

    void enable(Long id);
}