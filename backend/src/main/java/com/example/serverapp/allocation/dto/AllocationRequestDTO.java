package com.example.serverapp.allocation.dto;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class AllocationRequestDTO {

    @NotNull
    private Long accountId;

    @NotNull
    private Long dcaId;

    @NotNull
    private BigDecimal priorityScore;

    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public Long getDcaId() { return dcaId; }
    public void setDcaId(Long dcaId) { this.dcaId = dcaId; }

    public BigDecimal getPriorityScore() { return priorityScore; }
    public void setPriorityScore(BigDecimal priorityScore) { this.priorityScore = priorityScore; }
}
