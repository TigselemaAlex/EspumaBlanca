package com.espumablanca.backend.infrastructure.rest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/status/health")
public class HealthController {

    @GetMapping
    public String health() {
        return "I'm alive!";
    }
}
