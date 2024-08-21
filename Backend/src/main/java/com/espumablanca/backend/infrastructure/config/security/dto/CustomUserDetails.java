package com.espumablanca.backend.infrastructure.config.security.dto;

import com.espumablanca.backend.infrastructure.adapter.entity.UserEntity;
import com.espumablanca.backend.infrastructure.adapter.entity.PermissionEntity;
import com.espumablanca.backend.infrastructure.adapter.entity.RoleEntity;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Getter

public class CustomUserDetails implements UserDetails {

    private final UserEntity auth;

    public CustomUserDetails(UserEntity auth) {
        this.auth = auth;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();

        for (RoleEntity role : auth.getRoles()) {
            for (PermissionEntity permission : role.getPermissions()) {
                authorities.add(new SimpleGrantedAuthority(permission.getName().name()));
            }
        }

        return authorities;
    }

    @Override
    public String getPassword() {
        return auth.getPassword();
    }

    @Override
    public String getUsername() {
        return auth.getCi();
    }

    @Override
    public boolean isEnabled() {
        return auth.getEnabled();
    }
}