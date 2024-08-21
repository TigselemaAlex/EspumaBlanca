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

import com.espumablanca.backend.application.usecase.ProductService;
import com.espumablanca.backend.domain.model.dto.request.product.ProductRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product.ProductDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/protected/inventory/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<PageDto> findAll(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long category,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(productService.findAll(name, category, pageable));
    }

    @GetMapping(value = "/enabled")
    public ResponseEntity<PageDto> findAllEnabled(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long category,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok().body(productService.findAllEnabled(name, category, pageable));
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok().body(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<ProductDto> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok().body(productService.update(id, request));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/enable")
    public ResponseEntity<Void> enable(@PathVariable Long id) {
        productService.enable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/disable")
    public ResponseEntity<Void> disable(@PathVariable Long id) {
        productService.disable(id);
        return ResponseEntity.noContent().build();
    }

}
