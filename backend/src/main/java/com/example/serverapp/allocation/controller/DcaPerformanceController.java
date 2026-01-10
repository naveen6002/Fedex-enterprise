package com.example.serverapp.allocation.controller;

import com.example.serverapp.allocation.dto.DcaPerformanceMetricDTO;
import com.example.serverapp.allocation.model.AllocationDcaPerformanceMetric;
import com.example.serverapp.allocation.repository.AlloDcaPerformanceRepository;
import com.example.serverapp.ai_priority.enums.Period;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dca")
public class DcaPerformanceController {

    private final AlloDcaPerformanceRepository repository;

    public DcaPerformanceController(AlloDcaPerformanceRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{dcaId}/performance/latest")
    public DcaPerformanceMetricDTO getLatest(
            @PathVariable Long dcaId,
            @RequestParam("period") Period period
    ) {
        AllocationDcaPerformanceMetric metric =
                repository.findLatestMetric(dcaId, period)
                        .orElseThrow(() -> new RuntimeException("No metric found"));

        DcaPerformanceMetricDTO dto = new DcaPerformanceMetricDTO();
        dto.setMetricId(metric.getMetricId());
        dto.setDcaId(metric.getDca().getDcaId());
        dto.setRecoveryRate(metric.getRecoveryRate());
        dto.setAvgResolutionDays(metric.getAvgResolutionDays());
        dto.setEscalationCount(metric.getEscalationCount());
        dto.setPeriod(metric.getPeriod());

        return dto;
    }
}
