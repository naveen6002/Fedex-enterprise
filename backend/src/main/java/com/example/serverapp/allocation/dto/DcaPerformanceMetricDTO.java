package com.example.serverapp.allocation.dto;

import com.example.serverapp.ai_priority.enums.Period;
import java.math.BigDecimal;

public class DcaPerformanceMetricDTO {

    private Long metricId;
    private Long dcaId;
    private BigDecimal recoveryRate;
    private Integer avgResolutionDays;
    private Integer escalationCount;
    private Period period;

    // ✅ REQUIRED: no-args constructor
    public DcaPerformanceMetricDTO() {}

    // ===== getters & setters =====

    public Long getMetricId() {
        return metricId;
    }

    public void setMetricId(Long metricId) {
        this.metricId = metricId;
    }

    public Long getDcaId() {
        return dcaId;
    }

    public void setDcaId(Long dcaId) {
        this.dcaId = dcaId;
    }

    public BigDecimal getRecoveryRate() {
        return recoveryRate;
    }

    public void setRecoveryRate(BigDecimal recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public Integer getAvgResolutionDays() {
        return avgResolutionDays;
    }

    public void setAvgResolutionDays(Integer avgResolutionDays) {
        this.avgResolutionDays = avgResolutionDays;
    }

    public Integer getEscalationCount() {
        return escalationCount;
    }

    public void setEscalationCount(Integer escalationCount) {
        this.escalationCount = escalationCount;
    }

    public Period getPeriod() {
        return period;
    }

    public void setPeriod(Period period) {
        this.period = period;
    }
}
