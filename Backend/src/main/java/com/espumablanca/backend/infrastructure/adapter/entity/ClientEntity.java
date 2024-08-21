package com.espumablanca.backend.infrastructure.adapter.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "clients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientEntity extends AbstractEntity {
    @Column(length = 60, nullable = false)
    private String name;

    @Column(length = 60, nullable = false)
    private String lastname;

    private String email;

    @Column(length = 10, nullable = false)
    private String phone;

    private String address;

    private String city;

    @Column(length = 10, unique = true, nullable = false)
    private String ci;
}
