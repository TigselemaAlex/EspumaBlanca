package com.espumablanca.backend.infrastructure.rest.controller;

import com.espumablanca.backend.application.usecase.ProfileService;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileRequest;
import com.espumablanca.backend.domain.model.dto.request.profile.ProfileUpdatePasswordRequest;
import com.espumablanca.backend.domain.model.dto.response.profile.ProfileDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/protected/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProfileDto> getProfile(@PathVariable Long id) {
        return ResponseEntity.ok(profileService.getProfile(id));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProfileDto> update(@PathVariable Long id, @Valid @RequestBody ProfileRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(id, request));
    }

    @PutMapping(value = "/{id}/update/password")
    public ResponseEntity<ProfileDto> updatePassword(@PathVariable Long id, @Valid @RequestBody ProfileUpdatePasswordRequest request) {
        return ResponseEntity.ok(profileService.updatePassword(id, request));
    }
}