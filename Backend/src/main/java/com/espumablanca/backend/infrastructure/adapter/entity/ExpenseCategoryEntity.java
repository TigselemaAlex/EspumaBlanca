package com.espumablanca.backend.infrastructure.adapter.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "expense_categories")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseCategoryEntity extends AbstractEntity {

    @Column(length = 60, nullable = false)
    private String name;

    @OneToMany(mappedBy = "category", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<ExpenseEntity> expenses;
}