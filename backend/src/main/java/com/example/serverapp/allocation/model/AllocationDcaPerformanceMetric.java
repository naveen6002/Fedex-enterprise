package com.example.serverapp.allocation.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import com.example.serverapp.ai_priority.enums.Period;

import java.math.BigDecimal;

@Entity
@Table(name = "dca_performance_metrics")
public class AllocationDcaPerformanceMetric {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metric_id")
    private Long metricId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dca_id", nullable = false)
    private AllocationDca dca;

    @Column(name = "recovery_rate", precision = 5, scale = 2)
    private BigDecimal recoveryRate;

    @Column(name = "avg_resolution_days")
    private Integer avgResolutionDays;

    @Column(name = "escalation_count")
    private Integer escalationCount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "period")
    private Period period;

    public AllocationDcaPerformanceMetric() {};
    public AllocationDcaPerformanceMetric(
            AllocationDca dca,
            BigDecimal recoveryRate,
            Integer avgResolutionDays,
            Integer escalationCount,
            Period period
    ) {
        this.dca = dca;
        this.recoveryRate = recoveryRate;
        this.avgResolutionDays = avgResolutionDays;
        this.escalationCount = escalationCount;
        this.period = period;
    }

    public Long getMetricId() { return metricId; }
    public AllocationDca getDca() { return dca; }
    public BigDecimal getRecoveryRate() { return recoveryRate; }
    public Integer getAvgResolutionDays() { return avgResolutionDays; }
    public Integer getEscalationCount() { return escalationCount; }
    public Period getPeriod() { return period; }

    public void setMetricId(Long metricId) { this.metricId = metricId; }
    public void setDca(AllocationDca dca) { this.dca = dca; }
    public void setRecoveryRate(BigDecimal recoveryRate) { this.recoveryRate = recoveryRate; }
    public void setAvgResolutionDays(Integer avgResolutionDays) { this.avgResolutionDays = avgResolutionDays; }
    public void setEscalationCount(Integer escalationCount) { this.escalationCount = escalationCount; }
    public void setPeriod(Period period) { this.period = period; }

    

    // getters & setters
}
