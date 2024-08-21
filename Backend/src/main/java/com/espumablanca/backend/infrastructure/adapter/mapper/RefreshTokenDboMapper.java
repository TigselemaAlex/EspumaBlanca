package com.espumablanca.backend.infrastructure.adapter.mapper;

import com.espumablanca.backend.domain.model.RefreshToken;
import com.espumablanca.backend.infrastructure.adapter.entity.RefreshTokenEntity;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface RefreshTokenDboMapper {

        @Mappings({
                        @Mapping(source = "id", target = "id"),
                        @Mapping(source = "expirationDate", target = "expirationDate"),
                        @Mapping(source = "token", target = "token")
        })
        RefreshToken toDomain(RefreshTokenEntity entity);

        @InheritInverseConfiguration(name = "toDomain")
        RefreshTokenEntity toEntity(RefreshToken domain);
}