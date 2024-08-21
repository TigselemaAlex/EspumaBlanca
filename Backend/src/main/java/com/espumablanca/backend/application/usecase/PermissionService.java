package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.permission.PermissionRequest;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionDto;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionInRoleDto;

import java.util.List;

public interface PermissionService {

    PermissionDto create(PermissionRequest request);

    List<PermissionDto> getAll();

    List<PermissionInRoleDto> getAllByRoleId(Long roleId);

}