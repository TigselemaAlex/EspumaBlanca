package com.espumablanca.backend.domain.model;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class AbstractModel {
    private Long id;
    private Instant createdAt;
    private Instant updatedAt;
    private Boolean enabled;
}