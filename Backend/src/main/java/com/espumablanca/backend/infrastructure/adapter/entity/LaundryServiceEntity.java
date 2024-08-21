package com.espumablanca.backend.infrastructure.adapter.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "laundry_services")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LaundryServiceEntity extends AbstractEntity {
    @Column(length = 60, nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(length = 5)
    private String unitType;
}
