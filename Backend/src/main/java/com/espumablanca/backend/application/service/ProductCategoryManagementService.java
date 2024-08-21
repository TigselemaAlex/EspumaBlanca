package com.espumablanca.backend.application.service;

import com.espumablanca.backend.application.mapper.product_category.ProductCategoryDtoMapper;
import com.espumablanca.backend.application.mapper.product_category.ProductCategoryRequestMapper;
import com.espumablanca.backend.application.usecase.ProductCategoryService;
import com.espumablanca.backend.domain.model.dto.request.product_category.ProductCategoryRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product_category.ProductCategoryDto;
import com.espumablanca.backend.domain.port.ProductCategoryPort;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class ProductCategoryManagementService implements ProductCategoryService {

    private final ProductCategoryPort productCategoryPort;
    private final ProductCategoryDtoMapper productCategoryDtoMapper;
    private final ProductCategoryRequestMapper productCategoryRequestMapper;

    @Override
    public ProductCategoryDto create(ProductCategoryRequest request) {
        var categoryToCreate = productCategoryRequestMapper.toDomain(request);
        var categoryCreated = productCategoryPort.create(categoryToCreate);
        return productCategoryDtoMapper.toDto(categoryCreated);
    }

    @Override
    public ProductCategoryDto findById(Long id) {
        var category = productCategoryPort.findById(id);
        return productCategoryDtoMapper.toDto(category);
    }

    @Override
    public PageDto findAll(String name, Pageable pageable) {
        var categories = productCategoryPort.findAll(name, null, pageable);
        var categoriesDto = categories.map(productCategoryDtoMapper::toDto);
        return new PageDto(categoriesDto);
    }

    @Override
    public PageDto findAllEnabled(String name, Pageable pageable) {
        var categories = productCategoryPort.findAll(name, true, pageable);
        var categoriesDto = categories.map(productCategoryDtoMapper::toDto);
        return new PageDto(categoriesDto);
    }

    @Override
    public ProductCategoryDto update(Long id, ProductCategoryRequest request) {
        var categoryToUpdate = productCategoryPort.findById(id);
        categoryToUpdate.setName(request.name());
        var categoryUpdated = productCategoryPort.update(categoryToUpdate);
        return productCategoryDtoMapper.toDto(categoryUpdated);
    }

    @Override
    public void delete(Long id) {
        var category = productCategoryPort.findById(id);
        productCategoryPort.delete(category.getId());
    }

    @Override
    public void enable(Long id) {
        var category = productCategoryPort.findById(id);
        productCategoryPort.enable(category.getId());
    }

    @Override
    public void disable(Long id) {
        var category = productCategoryPort.findById(id);
        productCategoryPort.disable(category.getId());
    }
}