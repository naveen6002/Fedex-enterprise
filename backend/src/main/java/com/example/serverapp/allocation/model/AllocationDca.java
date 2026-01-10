package com.example.serverapp.allocation.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;
import com.example.serverapp.ai_priority.enums.DcaStatus;

@Data
@Entity
@Table(name = "dcas")
public class AllocationDca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "dca_id")
    private Long dcaId;

    @Column(name = "dca_name", nullable = false)
    private String dcaName;

    @Column(name = "commission_rate", precision = 5, scale = 2)
    private BigDecimal commissionRate;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private DcaStatus status;

    @Column(name = "region_id")
    private Long regionId;

    // 🔹 One DCA → Many performance metrics
    @OneToMany(mappedBy = "dca", fetch = FetchType.LAZY)
    private List<AllocationDcaPerformanceMetric> performanceMetrics;

    // 🔹 One DCA → Many cases
    @OneToMany(mappedBy = "dca", fetch = FetchType.LAZY)
    private List<AllocationDcaCase> cases;
}
