package com.espumablanca.backend.domain.model.dto.response;

import org.springframework.data.domain.Page;

public record PageDto(
        Object content,
        int currentPage,
        long totalItems,
        int totalPages
) {
    public PageDto(Page<?> page){
        this(page.getContent(), page.getNumber(), page.getTotalElements(), page.getTotalPages());
    }
}
