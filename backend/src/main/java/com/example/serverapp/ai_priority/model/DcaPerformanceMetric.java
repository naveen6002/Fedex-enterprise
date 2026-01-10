package com.example.serverapp.ai_priority.model;

import jakarta.persistence.*;

@Entity
@Table(name = "dca_performance_metrics")
public class DcaPerformanceMetric {

    @Id
    @Column(name = "metric_id")
    private Long metricId;

    @Column(name = "description")
    private Double recoveryRate;
}
