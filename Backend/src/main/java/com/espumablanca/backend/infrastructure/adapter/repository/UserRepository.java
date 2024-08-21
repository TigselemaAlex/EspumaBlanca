package com.espumablanca.backend.infrastructure.adapter.repository;

import com.espumablanca.backend.infrastructure.adapter.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long>, JpaSpecificationExecutor<UserEntity> {

    Optional<UserEntity> findByCi(String ci);

    @Modifying
    @Query("UPDATE UserEntity SET enabled = false, updatedAt = instant  WHERE id = :id")
    void disableById(@Param("id") Long id);

    @Modifying
    @Query("UPDATE UserEntity SET enabled = true, updatedAt = instant  WHERE id = :id")
    void enableById(@Param("id") Long id);

}