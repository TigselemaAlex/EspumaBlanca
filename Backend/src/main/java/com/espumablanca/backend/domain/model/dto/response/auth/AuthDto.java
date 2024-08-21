package com.espumablanca.backend.domain.model.dto.response.auth;

import org.springframework.http.ResponseCookie;

public record AuthDto(
        ResponseCookie accessToken,
        ResponseCookie token) {
}