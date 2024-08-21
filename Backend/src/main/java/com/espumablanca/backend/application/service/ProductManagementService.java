package com.espumablanca.backend.application.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.espumablanca.backend.application.mapper.product.ProductDtoMapper;
import com.espumablanca.backend.application.mapper.product.ProductRequestMapper;
import com.espumablanca.backend.application.usecase.ProductService;
import com.espumablanca.backend.domain.model.dto.request.product.ProductRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product.ProductDto;
import com.espumablanca.backend.domain.port.ProductCategoryPort;
import com.espumablanca.backend.domain.port.ProductPersistencePort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductManagementService implements ProductService {

    private final ProductPersistencePort productPersistencePort;
    private final ProductCategoryPort productCategoryPort;
    private final ProductDtoMapper productDtoMapper;
    private final ProductRequestMapper productRequestMapper;

    @Override
    public ProductDto create(ProductRequest request) {
        var productToCreate = productRequestMapper.toDomain(request);
        var category = productCategoryPort.findById(request.category());
        productToCreate.setCategory(category);
        var productCreated = productPersistencePort.create(productToCreate);
        return productDtoMapper.toDto(productCreated);
    }

    @Override
    public PageDto findAll(String name, Long category, Pageable pageable) {
        var categoryDomain = category != null ? productCategoryPort.findById(category) : null;
        var products = productPersistencePort.findAll(name, categoryDomain, null, pageable);
        var productsDto = products.map(productDtoMapper::toDto);
        return new PageDto(productsDto);
    }

    @Override
    public PageDto findAllEnabled(String name, Long category, Pageable pageable) {
        var categoryDomain = category != null ? productCategoryPort.findById(category) : null;
        var products = productPersistencePort.findAll(name, categoryDomain, true, pageable);
        var productsDto = products.map(productDtoMapper::toDto);
        return new PageDto(productsDto);
    }

    @Override
    public ProductDto findById(Long id) {
        var product = productPersistencePort.findById(id);
        return productDtoMapper.toDto(product);
    }

    @Override
    public ProductDto update(Long id, ProductRequest request) {
        var productToUpdate = productPersistencePort.findById(id);
        var category = productCategoryPort.findById(request.category());
        productToUpdate.setCategory(category);
        productToUpdate.setMinStock(request.minStock());
        productToUpdate.setName(request.name());
        productToUpdate.setDescription(request.description());
        productToUpdate.setStock(request.stock());
        var productUpdated = productPersistencePort.update(productToUpdate);
        return productDtoMapper.toDto(productUpdated);
    }

    @Override
    public void delete(Long id) {
        var product = productPersistencePort.findById(id);
        productPersistencePort.delete(product.getId());
    }

    @Override
    public void enable(Long id) {
        var product = productPersistencePort.findById(id);
        productPersistencePort.enable(product.getId());
    }

    @Override
    public void disable(Long id) {
        var product = productPersistencePort.findById(id);
        productPersistencePort.disable(product.getId());
    }

}
