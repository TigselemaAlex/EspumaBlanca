package com.espumablanca.backend.domain.model;

import com.espumablanca.backend.common.util.enums.RoleName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Role extends AbstractModel {
    private RoleName name;
    private Set<Permission> permissions;

    public void addPermissions(Set<Permission> permissions) {
        if (Objects.isNull(this.permissions)) {
            this.permissions = new HashSet<>();
        }
        this.permissions.addAll(permissions);
    }
}