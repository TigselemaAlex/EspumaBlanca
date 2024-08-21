package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.profile.ProfileRequest;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileUpdatePasswordRequest;
import com.espumablanca.backend.domain.model.dto.response.profile.ProfileDto;

public interface ProfileService {
    ProfileDto getProfile(Long id);

    ProfileDto updateProfile(Long id, ProfileRequest request);

    ProfileDto updatePassword(Long id, ProfileUpdatePasswordRequest request);
}