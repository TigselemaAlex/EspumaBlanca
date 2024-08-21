package com.espumablanca.backend.infrastructure.rest.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.espumablanca.backend.application.usecase.PermissionService;
import com.espumablanca.backend.domain.model.dto.response.permission.PermissionInRoleDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/protected/permissions")
@RequiredArgsConstructor
public class PermissionController {

    private final PermissionService permissionService;

    @GetMapping(value = "/{roleId}")
    public ResponseEntity<List<PermissionInRoleDto>> getAllByRoleId(@PathVariable Long roleId) {
        return ResponseEntity.ok(permissionService.getAllByRoleId(roleId));
    }
}