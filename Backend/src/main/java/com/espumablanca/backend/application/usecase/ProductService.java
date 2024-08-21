package com.espumablanca.backend.application.usecase;

import com.espumablanca.backend.domain.model.dto.request.product.ProductRequest;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import com.espumablanca.backend.domain.model.dto.response.product.ProductDto;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductDto create(ProductRequest request);

    PageDto findAll(String name, Long category, Pageable pageable);

    PageDto findAllEnabled(String name, Long category, Pageable pageable);

    ProductDto findById(Long id);

    ProductDto update(Long id, ProductRequest request);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}