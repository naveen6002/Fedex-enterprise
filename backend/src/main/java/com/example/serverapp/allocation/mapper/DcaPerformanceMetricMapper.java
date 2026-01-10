package com.example.serverapp.allocation.mapper;

import com.example.serverapp.allocation.dto.DcaPerformanceMetricDTO;
import com.example.serverapp.allocation.model.AllocationDcaPerformanceMetric;

public class DcaPerformanceMetricMapper {

    private DcaPerformanceMetricMapper() {}

    public static DcaPerformanceMetricDTO toDto(
            AllocationDcaPerformanceMetric metric) {

        if (metric == null) {
            return null;
        }

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
