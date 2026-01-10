package com.example.serverapp.allocation.dto;

public class AllocationRecommendationDTO {

    private Long accountId;
    private Long dcaId;
    private String dcaName;
    private String reason;

    public AllocationRecommendationDTO(
            Long accountId,
            Long dcaId,
            String dcaName,
            String reason) {
        this.accountId = accountId;
        this.dcaId = dcaId;
        this.dcaName = dcaName;
        this.reason = reason;
    }

    public Long getAccountId() { return accountId; }
    public Long getDcaId() { return dcaId; }
    public String getDcaName() { return dcaName; }
    public String getReason() { return reason; }
}
