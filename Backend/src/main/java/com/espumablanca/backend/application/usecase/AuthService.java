package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.auth.AuthLoginRequest;
import com.espumablanca.backend.domain.model.dto.response.auth.AuthDto;
import com.espumablanca.backend.domain.model.dto.response.auth.AuthLoggedDto;
import com.espumablanca.backend.domain.model.dto.response.auth.RefreshTokenDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    AuthDto login(AuthLoginRequest request);

    RefreshTokenDto refreshToken(HttpServletResponse response, HttpServletRequest request);

    AuthLoggedDto currentUser();

    void validateCookies(HttpServletResponse response, HttpServletRequest request);

    void logout(HttpServletResponse response, HttpServletRequest request);
}