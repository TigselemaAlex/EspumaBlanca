package com.espumablanca.backend.infrastructure.adapter.entity;

import com.espumablanca.backend.common.util.enums.PermissionName;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "permissions")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class PermissionEntity extends AbstractEntity {
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, unique = true)
    private PermissionName name;

    @ManyToMany(mappedBy = "permissions")
    private Set<RoleEntity> roles;
}