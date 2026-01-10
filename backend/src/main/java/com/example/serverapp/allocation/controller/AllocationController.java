package com.example.serverapp.allocation.controller;

import com.example.serverapp.allocation.dto.AllocationRequestDTO;
import com.example.serverapp.allocation.model.AllocationDca;
import com.example.serverapp.allocation.repository.AlloDcaRepository;
import com.example.serverapp.allocation.service.AllocationCommandService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/allocation")
public class AllocationController {

    private final AllocationCommandService service;
    private final AlloDcaRepository dcaRepository;

    public AllocationController(
            AllocationCommandService service,
            AlloDcaRepository dcaRepository) {
        this.service = service;
        this.dcaRepository = dcaRepository;
    }

    @PostMapping
    public ResponseEntity<String> allocate(
            @Valid @RequestBody AllocationRequestDTO request) {

        AllocationDca dca = dcaRepository.findById(request.getDcaId())
                .orElseThrow(() -> new IllegalArgumentException("DCA not found"));

        service.allocate(
                request.getAccountId(),
                dca,
                request.getPriorityScore()
        );

        return ResponseEntity.ok("Allocated successfully");
    }
}
