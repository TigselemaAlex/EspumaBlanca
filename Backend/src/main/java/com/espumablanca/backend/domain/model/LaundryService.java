package com.espumablanca.backend.domain.model;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class LaundryService extends AbstractModel {
    private String name;
    private String description;
    private BigDecimal price;
    private String unitType;
}