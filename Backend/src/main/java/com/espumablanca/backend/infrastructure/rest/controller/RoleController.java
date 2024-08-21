package com.espumablanca.backend.infrastructure.rest.controller;

import com.espumablanca.backend.application.usecase.RoleService;
import com.espumablanca.backend.domain.model.dto.request.role.RoleUpdatePermissionsRequest;
import com.espumablanca.backend.domain.model.dto.response.role.RoleDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/protected/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleDto>> getAll() {
        return ResponseEntity.ok(roleService.getAll());
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<RoleDto> updatePermissions(@PathVariable Long id, @Valid @RequestBody RoleUpdatePermissionsRequest request) {
        return ResponseEntity.ok(roleService.updatePermissions(id, request));
    }
}