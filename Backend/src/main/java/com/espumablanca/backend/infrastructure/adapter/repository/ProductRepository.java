package com.espumablanca.backend.infrastructure.adapter.repository;

import com.espumablanca.backend.infrastructure.adapter.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProductRepository extends JpaRepository<ProductEntity, Long>, JpaSpecificationExecutor<ProductEntity> {

    @Modifying
    @Query("UPDATE ProductEntity SET enabled = true, updatedAt = instant WHERE id = :id")
    void enableById(@Param(value = "id") Long id);

    @Modifying
    @Query("UPDATE ProductEntity SET enabled = false, updatedAt = instant WHERE id = :id")
    void disableById(@Param(value = "id") Long id);
}