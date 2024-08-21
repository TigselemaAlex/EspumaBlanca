package com.espumablanca.backend.infrastructure.config.security;

import com.espumablanca.backend.common.util.enums.PermissionName;
import com.espumablanca.backend.infrastructure.config.security.middleware.JwtMiddleware;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
        private final AuthenticationProvider authenticationProvider;
        private final JwtMiddleware jwtMiddleware;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .csrf(AbstractHttpConfigurer::disable)
                                .cors(corsConfig -> corsConfig.configurationSource(corsConfigurationSource()))
                                .authorizeHttpRequests(
                                                authorize -> authorize
                                                                .requestMatchers("/public/auth").permitAll()
                                                                .requestMatchers("/public/auth/logout").permitAll()
                                                                .requestMatchers("/status/health").permitAll()
                                                                .requestMatchers("/public/auth/refresh-token")
                                                                .permitAll()
                                                                .requestMatchers("/public/auth/validate-cookies")
                                                                .permitAll()
                                                                .requestMatchers("/public/auth/recover-password/**")
                                                                .permitAll()
                                                                .requestMatchers("/public/auth/current-user")
                                                                .authenticated()
                                                                .requestMatchers("/protected/profile/**")
                                                                .authenticated()
                                                                // PERMISSIONS MODULE
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/permissions/{roleId}")
                                                                .hasAuthority(PermissionName.PERMISSION_GET_ALL_BY_ROLE
                                                                                .name())
                                                                // ROLE MODULE
                                                                .requestMatchers(HttpMethod.GET, "/protected/roles")
                                                                .hasAuthority(PermissionName.ROLE_GET_ALL.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/roles/{id}")
                                                                .hasAuthority(PermissionName.ROLE_UPDATE_PERMISSIONS
                                                                                .name())
                                                                // CLIENT MODULE
                                                                .requestMatchers(HttpMethod.GET, "/protected/clients")
                                                                .hasAuthority(PermissionName.CLIENT_GET_ALL.name())
                                                                .requestMatchers(HttpMethod.POST, "/protected/clients")
                                                                .hasAuthority(PermissionName.CLIENT_CREATE.name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/clients/{id}")
                                                                .hasAuthority(PermissionName.CLIENT_GET_ONE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/clients/{id}")
                                                                .hasAuthority(PermissionName.CLIENT_UPDATE.name())
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/protected/clients/{id}")
                                                                .hasAuthority(PermissionName.CLIENT_DELETE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/clients/{id}/enable")
                                                                .hasAuthority(PermissionName.CLIENT_ENABLED.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/clients/{id}/disable")
                                                                .hasAuthority(PermissionName.CLIENT_DISABLED.name())
                                                                // LAUNDRY SERVICE MODULE
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/laundry-services")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_GET_ALL
                                                                                .name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/laundry-services/{id}")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_GET_ONE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.POST,
                                                                                "/protected/laundry-services")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_CREATE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/laundry-services/{id}")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_UPDATE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/protected/laundry-services/{id}")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_DELETE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/laundry-services/{id}/enable")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_ENABLED
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/laundry-services/{id}/disable")
                                                                .hasAuthority(PermissionName.LAUNDRY_SERVICE_DISABLED
                                                                                .name())

                                                                // INVENTORY MODULE
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/categories")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_GET_ALL
                                                                                .name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/categories/enabled")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_GET_ALL_ENABLED
                                                                                .name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/categories/{id}")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_GET_ONE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.POST,
                                                                                "/protected/inventory/categories")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_CREATE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/categories/{id}")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_UPDATE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/protected/inventory/categories/{id}")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_DELETE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/categories/{id}/enable")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_ENABLED
                                                                                .name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/categories/{id}/disable")
                                                                .hasAuthority(PermissionName.PRODUCT_CATEGORY_DISABLED
                                                                                .name())

                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/products")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_GET_ALL.name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/products/enabled")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_GET_ALL_ENABLED
                                                                                .name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/inventory/products/{id}")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_GET_ONE.name())
                                                                .requestMatchers(HttpMethod.POST,
                                                                                "/protected/inventory/products")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_CREATE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/products/{id}")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_UPDATE.name())
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/protected/inventory/products/{id}")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_DELETE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/products/{id}/enable")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_ENABLED.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/inventory/products/{id}/disable")
                                                                .hasAnyAuthority(PermissionName.PRODUCT_DISABLED.name())

                                                                // DEAL MODULE
                                                                .requestMatchers(HttpMethod.GET, "/protected/deals")
                                                                .hasAnyAuthority(PermissionName.DEAL_GET_ALL.name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/deals/enabled")
                                                                .hasAnyAuthority(PermissionName.DEAL_GET_ALL_ENABLED
                                                                                .name())
                                                                .requestMatchers(HttpMethod.GET,
                                                                                "/protected/deals/{id}")
                                                                .hasAnyAuthority(PermissionName.DEAL_GET_ONE
                                                                                .name())
                                                                .requestMatchers(HttpMethod.POST, "/protected/deals")
                                                                .hasAnyAuthority(PermissionName.DEAL_CREATE.name())
                                                                .requestMatchers(HttpMethod.DELETE,
                                                                                "/protected/deals/{id}")
                                                                .hasAnyAuthority(PermissionName.DEAL_DELETE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/deals/{id}")
                                                                .hasAnyAuthority(PermissionName.DEAL_UPDATE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/deals/{id}/enable")
                                                                .hasAnyAuthority(PermissionName.DEAL_UPDATE.name())
                                                                .requestMatchers(HttpMethod.PUT,
                                                                                "/protected/deals/{id}/disable")
                                                                .hasAnyAuthority(PermissionName.DEAL_UPDATE.name())

                                                                .anyRequest().denyAll())
                                .sessionManagement(
                                                sessionManagement -> sessionManagement
                                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .addFilterBefore(jwtMiddleware, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                return request -> {
                        var cors = new CorsConfiguration();
                        cors.setAllowedOriginPatterns(List.of("*"));
                        cors.setAllowedMethods(List.of(
                                        HttpMethod.GET.name(),
                                        HttpMethod.POST.name(),
                                        HttpMethod.DELETE.name(),
                                        HttpMethod.PUT.name(),
                                        HttpMethod.PATCH.name()));
                        cors.setAllowedHeaders(List.of(
                                        "*"));
                        cors.setAllowCredentials(true);
                        return cors;
                };
        }
}