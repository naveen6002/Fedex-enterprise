package com.example.serverapp.allocation.dto;

import jakarta.persistence.*;
import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "vw_eligible_accounts_for_allocation")
public class Allocation_EligibleAccount {

    @Id
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "outstanding_amount")
    private Double outstandingAmount;

    @Column(name = "delinquency_score")
    private Integer delinquencyScore;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_type")
    private String customerType;

    @Column(name = "risk_segment")
    private String riskSegment;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "region_name")
    private String regionName;

    // getters only (recommended for immutable views)

    public Long getAccountId() { return accountId; }
    public Double getOutstandingAmount() { return outstandingAmount; }
    public Integer getDelinquencyScore() { return delinquencyScore; }
    public Long getCustomerId() { return customerId; }
    public String getCustomerName() { return customerName; }
    public String getCustomerType() { return customerType; }
    public String getRiskSegment() { return riskSegment; }
    public Long getRegionId() { return regionId; }
    public String getRegionName() { return regionName; }
}
