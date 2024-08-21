package com.espumablanca.backend.infrastructure.adapter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.espumablanca.backend.infrastructure.adapter.entity.ClientEntity;

public interface ClientRepository extends JpaRepository<ClientEntity, Long>, JpaSpecificationExecutor<ClientEntity> {
    @Modifying
    @Query("UPDATE ClientEntity SET enabled = true, updatedAt = instant WHERE id = :id")
    void enableById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE ClientEntity SET enabled = false, updatedAt = instant WHERE id = :id")
    void disableById(@Param("id") Long id);
}
