package com.espumablanca.backend.infrastructure.rest.controller;

import com.espumablanca.backend.application.usecase.ProductCategoryService;
import com.espumablanca.backend.domain.model.dto.request.product_category.ProductCategoryRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product_category.ProductCategoryDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/protected/inventory/categories")
@RequiredArgsConstructor
public class ProductCategoryController {

    private final ProductCategoryService productCategoryService;

    @GetMapping
    public ResponseEntity<PageDto> findAll(@RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(productCategoryService.findAll(name, pageable));
    }

    @GetMapping(value = "/enabled")
    public ResponseEntity<PageDto> findAllEnabled(@RequestParam(required = false) String name,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(productCategoryService.findAllEnabled(name, pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductCategoryDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(productCategoryService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductCategoryDto> create(@Valid @RequestBody ProductCategoryRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productCategoryService.create(request));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProductCategoryDto> updated(@PathVariable Long id,
            @Valid @RequestBody ProductCategoryRequest request) {
        return ResponseEntity.ok().body(productCategoryService.update(id, request));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productCategoryService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/enable")
    public ResponseEntity<Void> enable(@PathVariable Long id) {
        productCategoryService.enable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/disable")
    public ResponseEntity<Void> disable(@PathVariable Long id) {
        productCategoryService.disable(id);
        return ResponseEntity.noContent().build();
    }
}