package com.espumablanca.backend.infrastructure.adapter.generator;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataLoader implements ApplicationListener<ApplicationReadyEvent> {

    @SuppressWarnings("unused")
    private final DataGeneratorService dataGeneratorService;

    @Override
    public void onApplicationEvent(@NonNull ApplicationReadyEvent event) {
        log.atInfo().log("Start loading data");
        // dataGeneratorService.generatePermissions();
        // dataGeneratorService.generateSuperAdminRole();
        // dataGeneratorService.generateOwnerRole();
        // dataGeneratorService.generateOtherRoles();
        // dataGeneratorService.generateSuperAdminUser();
        // dataGeneratorService.generateOwnerUser();
        log.atInfo().log("End loading data");

    }
}