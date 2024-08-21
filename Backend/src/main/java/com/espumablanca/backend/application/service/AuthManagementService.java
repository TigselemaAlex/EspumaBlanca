package com.espumablanca.backend.application.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.espumablanca.backend.application.usecase.AuthService;
import com.espumablanca.backend.domain.model.dto.request.auth.AuthLoginRequest;
import com.espumablanca.backend.domain.model.dto.response.auth.AuthDto;
import com.espumablanca.backend.domain.model.dto.response.auth.AuthLoggedDto;
import com.espumablanca.backend.domain.model.dto.response.auth.RefreshTokenDto;
import com.espumablanca.backend.domain.port.RefreshTokenPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.exception.RefreshTokenException;
import com.espumablanca.backend.infrastructure.adapter.mapper.UserDboMapper;
import com.espumablanca.backend.infrastructure.config.security.dto.CustomUserDetails;
import com.espumablanca.backend.infrastructure.config.security.provider.JwtProvider;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthManagementService implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final RefreshTokenPersistencePort refreshTokenPersistencePort;
    private final UserDboMapper userDboMapper;
    private final JwtProvider jwtProvider;

    @Value("${security.expiration-time}")
    private Long ACCESS_TOKEN_EXPIRATION_TIME;
    @Value("${security.refresh.expiration-time}")
    private Long TOKEN_EXPIRATION_TIME;

    @Override
    public AuthDto login(AuthLoginRequest request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.ci(),
                        request.password()));
        CustomUserDetails user = (CustomUserDetails) authentication.getPrincipal();
        String accessToken = jwtProvider.generateToken(user);
        var token = refreshTokenPersistencePort.create(user.getUsername());

        ResponseCookie cookieAccessToken = ResponseCookie.from("accessToken", accessToken)
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(ACCESS_TOKEN_EXPIRATION_TIME / 1000)
                .build();
        ResponseCookie cookieToken = ResponseCookie.from("token", token.getToken())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(TOKEN_EXPIRATION_TIME / 1000)
                .build();
        return new AuthDto(cookieAccessToken, cookieToken);
    }

    @Override
    public RefreshTokenDto refreshToken(HttpServletResponse response, HttpServletRequest request) {
        var cookies = request.getCookies();
        if (Objects.nonNull(cookies)) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("token")) {
                    var refreshToken = refreshTokenPersistencePort.findByToken(cookie.getValue());
                    refreshToken = refreshTokenPersistencePort.verifyExpiration(refreshToken);
                    var user = new CustomUserDetails(userDboMapper.toEntity(refreshToken.getUser()));
                    String accessToken = jwtProvider.generateToken(user);
                    ResponseCookie cookieAccessToken = ResponseCookie.from("accessToken", accessToken)
                            .httpOnly(true)
                            .secure(false)
                            .maxAge(ACCESS_TOKEN_EXPIRATION_TIME / 1000)
                            .path("/")
                            .build();
                    return new RefreshTokenDto(cookieAccessToken);
                }
            }
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }

    @Override
    public AuthLoggedDto currentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(authentication) || !authentication.isAuthenticated()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        var fullName = userDetails.getAuth().getName() + " " + userDetails.getAuth().getLastname();
        return new AuthLoggedDto(userDetails.getAuth().getId(), fullName, userDetails.getAuthorities());
    }

    @Override
    public void validateCookies(HttpServletResponse response, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (Objects.isNull(authentication) || !authentication.isAuthenticated()) {
            for (Cookie cookie : cookies) {
                clearCookie(cookie);
                response.addCookie(cookie);
            }
        }
        if (Objects.nonNull(cookies)) {
            for (Cookie cookie : cookies) {
                if (isCookieExpiredOrInvalid(cookie, (UserDetails) authentication.getPrincipal())) {
                    clearCookie(cookie);
                    response.addCookie(cookie);
                }
            }
        }

    }

    @Override
    public void logout(HttpServletResponse response, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (Objects.nonNull(cookies)) {
            for (Cookie cookie : cookies) {
                clearCookie(cookie);
                response.addCookie(cookie);
            }
        }
    }

    private void clearCookie(Cookie cookie) {
        cookie.setValue(null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
    }

    private Boolean isCookieExpiredOrInvalid(Cookie cookie, UserDetails userDetails) {
        if (cookie.getName().equals("accessToken")) {
            return jwtProvider.validateToken(cookie.getValue(), userDetails);
        }
        if (cookie.getName().equals("token")) {
            try {
                refreshTokenPersistencePort
                        .verifyExpiration(refreshTokenPersistencePort.findByToken(cookie.getValue()));
                return true;
            } catch (RefreshTokenException ex) {
                return false;
            }

        }
        return false;
    }
}