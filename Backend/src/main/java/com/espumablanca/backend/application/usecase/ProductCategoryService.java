package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.product_category.ProductCategoryRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product_category.ProductCategoryDto;
import org.springframework.data.domain.Pageable;


public interface ProductCategoryService {

    ProductCategoryDto create(ProductCategoryRequest request);

    ProductCategoryDto findById(Long id);

    PageDto findAll(String name, Pageable pageable);

    PageDto findAllEnabled(String name, Pageable pageable);

    ProductCategoryDto update(Long id, ProductCategoryRequest request);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}