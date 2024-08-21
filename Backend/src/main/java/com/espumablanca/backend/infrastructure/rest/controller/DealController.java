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

import com.espumablanca.backend.application.usecase.DealService;
import com.espumablanca.backend.domain.model.dto.request.deal.DealRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.deal.DealDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/protected/deals")
@RequiredArgsConstructor
public class DealController {
    private final DealService dealService;

    @GetMapping
    public ResponseEntity<PageDto> findAll(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(dealService.getAll(name, pageable));
    }

    @GetMapping(value = "/enabled")
    public ResponseEntity<PageDto> findAllEnabled(
            @RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(dealService.getAllEnabled(name, pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<DealDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(dealService.getById(id));
    }

    @PostMapping
    public ResponseEntity<DealDto> create(@Valid @RequestBody DealRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(dealService.create(request));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<DealDto> update(@PathVariable Long id, @Valid @RequestBody DealRequest request) {
        return ResponseEntity.ok().body(dealService.update(id, request));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        dealService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/enable")
    public ResponseEntity<Void> enable(@PathVariable Long id) {
        dealService.enable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/disable")
    public ResponseEntity<Void> disable(@PathVariable Long id) {
        dealService.disable(id);
        return ResponseEntity.noContent().build();
    }
}