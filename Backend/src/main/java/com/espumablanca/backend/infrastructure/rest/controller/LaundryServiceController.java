package com.espumablanca.backend.infrastructure.rest.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.espumablanca.backend.application.usecase.Laundry_ServiceService;
import com.espumablanca.backend.domain.model.dto.request.laundry_service.LaundryServiceRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.laundry_service.LaundryServiceDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/protected/laundry-services")
@RequiredArgsConstructor
public class LaundryServiceController {

    private final Laundry_ServiceService laundry_serviceService;

    @GetMapping
    public ResponseEntity<PageDto> getAllLaundryServices(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(laundry_serviceService.getAll(name, pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<LaundryServiceDto> getLaundryServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(laundry_serviceService.getById(id));
    }

    @PostMapping
    public ResponseEntity<LaundryServiceDto> createLaundryService(@Valid @RequestBody LaundryServiceRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(laundry_serviceService.create(request));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<LaundryServiceDto> updateLaundryService(@Valid @RequestBody LaundryServiceRequest request,
            @PathVariable Long id) {
        return ResponseEntity.ok().body(laundry_serviceService.update(id, request));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteLaundryService(@PathVariable Long id) {
        laundry_serviceService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/enable")
    public ResponseEntity<Void> enableLaundryService(@PathVariable Long id) {
        laundry_serviceService.enable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/disable")
    public ResponseEntity<Void> disableLaundryService(@PathVariable Long id) {
        laundry_serviceService.disable(id);
        return ResponseEntity.noContent().build();
    }
}