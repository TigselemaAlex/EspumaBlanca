package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.Product;
import com.espumablanca.backend.domain.model.ProductCategory;
import com.espumablanca.backend.domain.port.ProductPersistencePort;
import com.espumablanca.backend.infrastructure.adapter.mapper.ProductCategoryDboMapper;
import com.espumablanca.backend.infrastructure.adapter.mapper.ProductDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.ProductRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.ProductSpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductSpringJpaAdapter implements ProductPersistencePort {

    private final ProductRepository productRepository;
    private final ProductDboMapper productDboMapper;
    private final ProductCategoryDboMapper productCategoryDboMapper;

    @Override
    public Product create(Product product) {
        var productToCreate = productDboMapper.toEntity(product);
        var productCreated = productRepository.save(productToCreate);
        return productDboMapper.toDomain(productCreated);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(String name, ProductCategory category, Boolean enabled, Pageable pageable) {
        var categoryToSearch = productCategoryDboMapper.toEntity(category);
        var products = productRepository.findAll(ProductSpecification.withCustomFilter(name, categoryToSearch, enabled),
                pageable);
        return products.map(
                productDboMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public Product findById(Long id) {
        var product = productRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return productDboMapper.toDomain(product);
    }

    @Override
    public Product update(Product product) {
        var productToUpdate = productDboMapper.toEntity(product);
        var productUpdated = productRepository.save(productToUpdate);
        return productDboMapper.toDomain(productUpdated);
    }

    @Override
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public void enable(Long id) {
        productRepository.enableById(id);
    }

    @Override
    public void disable(Long id) {
        productRepository.disableById(id);
    }
}