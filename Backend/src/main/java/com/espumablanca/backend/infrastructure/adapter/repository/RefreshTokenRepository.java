package com.espumablanca.backend.infrastructure.adapter.repository;

import com.espumablanca.backend.infrastructure.adapter.entity.RefreshTokenEntity;
import com.espumablanca.backend.infrastructure.adapter.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {

    Optional<RefreshTokenEntity> findByToken(String token);

    Optional<RefreshTokenEntity> findByUser(UserEntity user);
}