package com.espumablanca.backend.domain.model;

import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RefreshToken {
    private Long id;
    private String token;
    private Instant expirationDate;
    private User user;
}