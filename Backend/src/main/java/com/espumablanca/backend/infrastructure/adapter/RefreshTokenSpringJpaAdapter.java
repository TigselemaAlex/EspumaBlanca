package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.RefreshToken;
import com.espumablanca.backend.domain.port.RefreshTokenPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.entity.RefreshTokenEntity;
import com.espumablanca.backend.infrastructure.adapter.exception.RefreshTokenException;
import com.espumablanca.backend.infrastructure.adapter.mapper.RefreshTokenDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.UserRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.RefreshTokenRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenSpringJpaAdapter implements RefreshTokenPersistencePort {

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final RefreshTokenDboMapper refreshTokenDboMapper;

    @Value("${security.refresh.expiration-time}")
    private Long REFRESH_EXPIRATION_TIME;

    @Override
    public RefreshToken create(String username) {
        var user = userRepository.findByCi(username).orElseThrow(EntityNotFoundException::new);
        var oldToken = refreshTokenRepository.findByUser(user);
        RefreshTokenEntity refreshTokenToCreate = null;
        if (oldToken.isPresent()) {
            refreshTokenToCreate = oldToken.get();
            refreshTokenToCreate.setExpirationDate(Instant.now().plusMillis(REFRESH_EXPIRATION_TIME));
            refreshTokenToCreate.setToken(UUID.randomUUID().toString());
        } else {
            refreshTokenToCreate = RefreshTokenEntity
                .builder()
                .user(user)
                .expirationDate(Instant.now().plusMillis(REFRESH_EXPIRATION_TIME))
                .token(UUID.randomUUID().toString())
                .build();
        }
        var refreshTokenCreated = refreshTokenRepository.save(refreshTokenToCreate);
        return refreshTokenDboMapper.toDomain(refreshTokenCreated);
    }

    @Override
    public RefreshToken findByToken(String token) {
        var refreshToken = refreshTokenRepository.findByToken(token).orElseThrow(EntityNotFoundException::new);
        return refreshTokenDboMapper.toDomain(refreshToken);
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpirationDate().compareTo(Instant.now()) < 0) {
            var refreshToken = refreshTokenDboMapper.toEntity(token);
            refreshTokenRepository.delete(refreshToken);
            throw new RefreshTokenException("Refresh accessToken has expired");
        }
        return token;
    }
}