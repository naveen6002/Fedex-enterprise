package com.example.serverapp.ai_priority.controller;

import com.example.serverapp.ai_priority.service.CasePriorityEngineService;
import com.example.serverapp.ai_priority.dto.CasePriorityDTO;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/case-intelligence")
public class CaseIntelligenceController {

    private final CasePriorityEngineService engineService;

    public CaseIntelligenceController(CasePriorityEngineService engineService) {
        this.engineService = engineService;
    }

    @PostMapping("/run")
    public Page<CasePriorityDTO> runEngine(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return engineService.runCasePriorityEngine(page, size);
    }
}

