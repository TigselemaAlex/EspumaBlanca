package com.espumablanca.backend.application.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.mapper.profile.ProfileDtoMapper;
import com.espumablanca.backend.application.usecase.ProfileService;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileRequest;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileUpdatePasswordRequest;
import com.espumablanca.backend.domain.model.dto.response.profile.ProfileDto;
import com.espumablanca.backend.domain.port.UserPersistencePort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileManagementService implements ProfileService {

    private final UserPersistencePort userPersistencePort;
    private final ProfileDtoMapper profileDtoMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ProfileDto getProfile(Long id) {
        var user = userPersistencePort.getById(id);
        return profileDtoMapper.toDto(user);
    }

    @Override
    public ProfileDto updateProfile(Long id, ProfileRequest request) {
        var user = userPersistencePort.getById(id);
        user.setEmail(request.email());
        user.setName(request.name());
        user.setLastname(request.lastname());
        var userUpdated = userPersistencePort.update(user);
        return profileDtoMapper.toDto(userUpdated);
    }

    @Override
    public ProfileDto updatePassword(Long id, ProfileUpdatePasswordRequest request) {
        var user = userPersistencePort.getById(id);
        user.setPassword(passwordEncoder.encode(request.password()));
        var userUpdated = userPersistencePort.update(user);
        return profileDtoMapper.toDto(userUpdated);
    }
}