package com.espumablanca.backend.infrastructure.rest.controller;

import com.espumablanca.backend.application.usecase.ClientService;
import com.espumablanca.backend.domain.model.dto.request.client.ClientRequest;
import com.espumablanca.backend.domain.model.dto.response.client.ClientDto;
import com.espumablanca.backend.domain.model.dto.response.client.ClientFullNameDto;
import com.espumablanca.backend.domain.model.dto.response.PageDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/protected/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientFullNameDto> createNewClient(@Valid @RequestBody ClientRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.create(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientDto> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientDto> updateClient(@PathVariable Long id, @RequestBody ClientRequest request) {
        return ResponseEntity.ok(clientService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<PageDto> getAllClients(@RequestParam(required = false) String value,
            @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(clientService.getAll(value, pageable));
    }

    @PutMapping("/{id}/enable")
    public ResponseEntity<Void> enableClient(@PathVariable Long id) {
        clientService.enable(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/disable")
    public ResponseEntity<Void> disableClient(@PathVariable Long id) {
        clientService.disable(id);
        return ResponseEntity.noContent().build();
    }
}
