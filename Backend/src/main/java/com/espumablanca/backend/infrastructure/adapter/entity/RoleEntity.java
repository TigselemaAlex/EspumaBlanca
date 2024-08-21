package com.espumablanca.backend.infrastructure.adapter.entity;

import com.espumablanca.backend.common.util.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "roles")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RoleEntity extends AbstractEntity {
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, unique = true)
    private RoleName name;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "roles_permissions",
        joinColumns = @JoinColumn(name = "role_id", nullable = false),
        inverseJoinColumns = @JoinColumn(name = "permission_id", nullable = false)
    )
    private Set<PermissionEntity> permissions;

    @ManyToMany(mappedBy = "roles")
    private Set<UserEntity> users;
}