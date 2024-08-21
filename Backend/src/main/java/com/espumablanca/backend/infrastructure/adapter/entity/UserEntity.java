package com.espumablanca.backend.infrastructure.adapter.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "auth")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity extends AbstractEntity {
    @Column(length = 60, nullable = false)
    private String name;

    @Column(length = 60, nullable = false)
    private String lastname;

    @Column(length = 10, unique = true, nullable = false)
    private String ci;

    @Column(nullable = false)
    private String password;

    private String email;

    @Column(length = 10, nullable = false)
    private String phone;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "auth_roles",
        joinColumns = @JoinColumn(name = "auth_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<RoleEntity> roles;

    @OneToOne(orphanRemoval = true, cascade = CascadeType.ALL)
    private RefreshTokenEntity refreshToken;
}