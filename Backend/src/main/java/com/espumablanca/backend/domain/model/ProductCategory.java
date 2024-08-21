package com.espumablanca.backend.domain.model;

import lombok.*;

import java.util.Set;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ProductCategory extends AbstractModel {
    private String name;
    private Set<Product> products;
}