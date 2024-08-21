package com.espumablanca.backend.domain.model;

import com.espumablanca.backend.common.util.enums.PermissionName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Permission extends AbstractModel {
    private PermissionName name;
}