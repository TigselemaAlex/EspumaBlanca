package com.espumablanca.backend.domain.model.dto.response.auth;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public record AuthLoggedDto(
        Long id,
        String fullName,
        Collection<? extends GrantedAuthority> permissions

) {
}