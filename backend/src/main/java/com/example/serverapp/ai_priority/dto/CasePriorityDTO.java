package com.example.serverapp.ai_priority.dto;

public class CasePriorityDTO {

    private Long caseId;
    private Long accountId;
    private Double outstandingAmount;
    private String riskSegment;
    private Double priorityScore;

    public CasePriorityDTO(
            Long caseId,
            Long accountId,
            Double outstandingAmount,
            String riskSegment,
            Double priorityScore) {

        this.caseId = caseId;
        this.accountId = accountId;
        this.outstandingAmount = outstandingAmount;
        this.riskSegment = riskSegment;
        this.priorityScore = priorityScore;
    }

    // getters only (immutable DTO)
    public Long getCaseId() { return caseId; }
    public Long getAccountId() { return accountId; }
    public Double getOutstandingAmount() { return outstandingAmount; }
    public String getRiskSegment() { return riskSegment; }
    public Double getPriorityScore() { return priorityScore; }
}
