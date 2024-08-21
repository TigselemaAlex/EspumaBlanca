package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductCategoryPort {

    ProductCategory create(ProductCategory category);

    Page<ProductCategory> findAll(String name, Boolean enabled, Pageable pageable);

    ProductCategory findById(Long id);

    ProductCategory update(ProductCategory category);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}