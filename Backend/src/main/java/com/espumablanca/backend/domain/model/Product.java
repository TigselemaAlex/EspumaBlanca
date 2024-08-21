package com.espumablanca.backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Product extends AbstractModel {
    private String name;
    private String description;
    private Integer stock;
    private Integer minStock;
    private ProductCategory category;
}