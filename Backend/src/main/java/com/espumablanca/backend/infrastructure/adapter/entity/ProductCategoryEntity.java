package com.espumablanca.backend.infrastructure.adapter.entity;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "product_categories")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategoryEntity extends AbstractEntity {

    @Column(length = 60, nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "category", orphanRemoval = true)
    private Set<ProductEntity> products = new HashSet<>();

    public void setProducts(Set<ProductEntity> products) {
        this.products.clear();
        if (products != null) {
            this.products.addAll(products);
        }
    }

}