package com.espumablanca.backend.infrastructure.adapter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.espumablanca.backend.infrastructure.adapter.entity.DealEntity;

public interface DealRepository extends JpaRepository<DealEntity, Long>, JpaSpecificationExecutor<DealEntity> {
    @Modifying
    @Query("UPDATE DealEntity SET enabled = true, updatedAt = instant WHERE id = :id")
    void enableById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE DealEntity SET enabled = false, updatedAt = instant WHERE id = :id")
    void disableById(@Param("id") Long id);

}
