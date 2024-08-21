package com.espumablanca.backend.domain.model;

import lombok.*;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class User extends AbstractModel {
    private String name;
    private String lastname;
    private String ci;
    private String email;
    private String password;
    private String phone;
    private Set<Role> roles;

    public void addRoles(Set<Role> roles) {
        if (Objects.isNull(this.roles)) {
            this.roles = new HashSet<>();
        }
        this.roles.addAll(roles);
    }
}