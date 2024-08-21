package com.espumablanca.backend.domain.port;

import com.espumablanca.backend.domain.model.Product;
import com.espumablanca.backend.domain.model.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductPersistencePort {
    Product create(Product product);

    Page<Product> findAll(String name, ProductCategory category, Boolean enabled, Pageable pageable);

    Product findById(Long id);

    Product update(Product product);

    void delete(Long id);

    void enable(Long id);

    void disable(Long id);
}