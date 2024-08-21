package com.espumablanca.backend.infrastructure.adapter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "deals")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class DealEntity extends AbstractEntity {
    @Column(length = 60, nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private BigDecimal value;
}