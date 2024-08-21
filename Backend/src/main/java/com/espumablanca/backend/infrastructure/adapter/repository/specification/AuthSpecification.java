package com.espumablanca.backend.infrastructure.adapter.repository.specification;

import com.espumablanca.backend.infrastructure.adapter.entity.UserEntity;
import com.espumablanca.backend.infrastructure.adapter.entity.RoleEntity;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


public interface AuthSpecification {

    static Specification<UserEntity> withCustomFilter(String value, RoleEntity role, Boolean enabled) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (Objects.nonNull(enabled)) {
                predicates.add(criteriaBuilder.equal(root.get("enabled"), enabled));
            }

            if (Objects.nonNull(role)) {
                Join<UserEntity, RoleEntity> rolesJoin = root.join("roles", JoinType.INNER);
                predicates.add(criteriaBuilder.equal(rolesJoin.get("id"), role.getId()));
            }

            if (Objects.nonNull(value)) {
                var likePatter = "%" + value.toLowerCase() + "%";
                predicates.add(
                    criteriaBuilder.or(
                        criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("name")), likePatter
                        ),
                        criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("lastname")), likePatter
                        ),
                        criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("ci")), likePatter
                        ),
                        criteriaBuilder.like(
                            criteriaBuilder.lower(
                                criteriaBuilder.concat(root.get("name"),
                                    criteriaBuilder.concat(" ", root.get("lastname")))
                            ),
                            likePatter
                        ),
                        criteriaBuilder.like(
                            criteriaBuilder.lower(
                                criteriaBuilder.concat(root.get("lastname"),
                                    criteriaBuilder.concat(" ", root.get("name")))
                            ),
                            likePatter
                        )
                    )
                );
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}