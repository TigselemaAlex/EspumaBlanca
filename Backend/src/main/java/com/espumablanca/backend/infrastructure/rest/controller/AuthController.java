package com.espumablanca.backend.infrastructure.rest.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.espumablanca.backend.application.usecase.AuthService;
import com.espumablanca.backend.domain.model.dto.request.auth.AuthLoginRequest;
import com.espumablanca.backend.domain.model.dto.response.auth.AuthLoggedDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/public/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<?> login(@Valid @RequestBody AuthLoginRequest request, HttpServletResponse response) {
        var responseCookies = authService.login(request);
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookies.accessToken().toString());
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookies.token().toString());
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/refresh-token")
    public ResponseEntity<?> refreshToken(HttpServletResponse response, HttpServletRequest request) {
        var responseCookies = authService.refreshToken(response, request);
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookies.accessToken().toString());
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "/current-user")
    public ResponseEntity<AuthLoggedDto> getCurrentUser() {
        return ResponseEntity.ok(authService.currentUser());
    }

    @PostMapping(value = "logout")
    public ResponseEntity<AuthLoggedDto> logout(HttpServletResponse response, HttpServletRequest request) {
        authService.logout(response, request);
        return ResponseEntity.ok().build();
    }

}