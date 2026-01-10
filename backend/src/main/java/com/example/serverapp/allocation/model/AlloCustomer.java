package com.example.serverapp.allocation.model;

import com.example.serverapp.allocation.enums.CustomerStatus;
import com.example.serverapp.ai_priority.enums.CustomerType;
import com.example.serverapp.ai_priority.enums.RiskSegment;

import java.time.LocalDateTime;

/**
 * Allocation-side Customer DTO.
 * NOT a JPA Entity.
 */
public class AlloCustomer {

    private Long customerId;
    private String customerName;
    private CustomerType customerType;
    private RiskSegment riskSegment;
    private CustomerStatus status;
    private LocalDateTime createdAt;
    private Long regionId;

    public AlloCustomer() {}

    public AlloCustomer(
            Long customerId,
            String customerName,
            CustomerType customerType,
            RiskSegment riskSegment,
            CustomerStatus status,
            LocalDateTime createdAt,
            Long regionId
    ) {
        this.customerId = customerId;
        this.customerName = customerName;
        this.customerType = customerType;
        this.riskSegment = riskSegment;
        this.status = status;
        this.createdAt = createdAt;
        this.regionId = regionId;
    }

    // -------- getters --------

    public Long getCustomerId() {
        return customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public RiskSegment getRiskSegment() {
        return riskSegment;
    }

    public CustomerStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Long getRegionId() {
        return regionId;
    }

    // -------- setters (needed by AllocationCommandService) --------

    public void setStatus(CustomerStatus status) {
        this.status = status;
    }

    public void setRegionId(Long regionId) {
        this.regionId = regionId;
    }
}
