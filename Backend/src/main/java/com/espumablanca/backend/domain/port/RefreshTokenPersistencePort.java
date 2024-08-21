package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.RefreshToken;

public interface RefreshTokenPersistencePort {

    RefreshToken create(String username);

    RefreshToken findByToken(String token);

    RefreshToken verifyExpiration(RefreshToken token);
}