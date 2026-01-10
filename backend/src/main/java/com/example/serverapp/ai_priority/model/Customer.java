package com.example.serverapp.ai_priority.model;

import com.example.serverapp.allocation.enums.CustomerStatus;
import com.example.serverapp.ai_priority.enums.RiskSegment;
import jakarta.persistence.*;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Enumerated(EnumType.STRING)
    @Column(name = "risk_segment")
    private RiskSegment riskSegment;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private CustomerStatus status;

    // 🔥 THIS WAS MISSING
    @Column(name = "region_id")
    private Long regionId;

    // ===== getters & setters =====

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public RiskSegment getRiskSegment() {
        return riskSegment;
    }

    public CustomerStatus getStatus() {
        return status;
    }

    public void setStatus(CustomerStatus status) {
        this.status = status;
    }

    public Long getRegionId() {
        return regionId;
    }
}
    