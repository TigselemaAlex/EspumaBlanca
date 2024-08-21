package com.espumablanca.backend.infrastructure.adapter.repository;

import com.espumablanca.backend.infrastructure.adapter.entity.LaundryServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LaundryServiceRepository extends JpaRepository<LaundryServiceEntity, Long>, JpaSpecificationExecutor<LaundryServiceEntity> {

    @Modifying
    @Query("UPDATE LaundryServiceEntity SET enabled = true, updatedAt = instant WHERE id = :id")
    void enableById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE LaundryServiceEntity SET enabled = false, updatedAt = instant WHERE id = :id")
    void disableById(@Param("id") Long id);
}