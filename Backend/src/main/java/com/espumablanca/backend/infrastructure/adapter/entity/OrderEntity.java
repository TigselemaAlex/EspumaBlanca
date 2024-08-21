package com.espumablanca.backend.infrastructure.adapter.entity;

import com.espumablanca.backend.common.util.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Set;

@Entity
@Table(name = "orders")
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class OrderEntity extends AbstractEntity {

    private String code;

    @Column(nullable = false)
    private Calendar issueDate;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(nullable = false)
    private BigDecimal total;

    @ManyToOne
    @JoinColumn(nullable = false)
    private ClientEntity client;

    @ManyToOne
    private DealEntity deal;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItemEntity> items;

    public BigDecimal calculateTotal() {
        BigDecimal subTotal = BigDecimal.valueOf(items.stream().mapToDouble(OrderItemEntity::getQuantity).sum());
        return deal != null ? subTotal.subtract(deal.getValue()) : BigDecimal.ZERO;
    }

}