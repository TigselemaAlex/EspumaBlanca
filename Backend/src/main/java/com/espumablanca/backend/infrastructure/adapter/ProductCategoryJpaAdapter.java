package com.espumablanca.backend.infrastructure.adapter;

import com.espumablanca.backend.domain.model.ProductCategory;
import com.espumablanca.backend.domain.port.ProductCategoryPort;
import com.espumablanca.backend.infrastructure.adapter.mapper.ProductCategoryDboMapper;
import com.espumablanca.backend.infrastructure.adapter.repository.ProductCategoryRepository;
import com.espumablanca.backend.infrastructure.adapter.repository.specification.ProductCategorySpecification;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductCategoryJpaAdapter implements ProductCategoryPort {

    private final ProductCategoryRepository productCategoryRepository;
    private final ProductCategoryDboMapper productCategoryDboMapper;

    @Override
    public ProductCategory create(ProductCategory category) {
        var categoryToSave = productCategoryDboMapper.toEntity(category);
        var categorySaved = productCategoryRepository.save(categoryToSave);
        return productCategoryDboMapper.toDomain(categorySaved);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductCategory> findAll(String name, Boolean enabled, Pageable pageable) {
        return productCategoryRepository
                .findAll(ProductCategorySpecification.withCustomFilter(name, enabled), pageable)
                .map(productCategoryDboMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductCategory findById(Long id) {
        var category = productCategoryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
        return productCategoryDboMapper.toDomain(category);
    }

    @Override
    public ProductCategory update(ProductCategory category) {
        var categoryToUpdate = productCategoryDboMapper.toEntity(category);
        var categoryUpdated = productCategoryRepository.save(categoryToUpdate);
        return productCategoryDboMapper.toDomain(categoryUpdated);
    }

    @Override
    public void delete(Long id) {
        productCategoryRepository.deleteById(id);
    }

    @Override
    public void enable(Long id) {
        productCategoryRepository.enableById(id);
    }

    @Override
    public void disable(Long id) {
        productCategoryRepository.disableById(id);
    }
}