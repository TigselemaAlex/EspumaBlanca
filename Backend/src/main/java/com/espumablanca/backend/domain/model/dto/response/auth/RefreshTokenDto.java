package com.espumablanca.backend.domain.model.dto.response.auth;

import org.springframework.http.ResponseCookie;

public record RefreshTokenDto(ResponseCookie accessToken) {

}