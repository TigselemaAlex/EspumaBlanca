package com.espumablanca.backend.infrastructure.adapter.repository.specification;

import com.espumablanca.backend.infrastructure.adapter.entity.ProductCategoryEntity;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public interface ProductCategorySpecification {

    static Specification<ProductCategoryEntity> withCustomFilter(String name, Boolean enabled) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (Objects.nonNull(name)) {
                var likePattern = "%" + name.toLowerCase() + "%";
                predicates.add(criteriaBuilder.like(
                    criteriaBuilder.lower(root.get("name")), likePattern
                ));
            }

            if (Objects.nonNull(enabled)) {
                predicates.add(
                    criteriaBuilder.equal(root.get("enabled"), enabled)
                );
            }
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}