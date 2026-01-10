package com.example.serverapp.allocation.model;

import com.example.serverapp.ai_priority.enums.CaseStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "dca_cases",
    uniqueConstraints = @UniqueConstraint(columnNames = {"account_id"})
)
public class AllocationDcaCase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "case_id")
    private Long caseId;

    @Column(name = "account_id", nullable = false, unique = true)
    private Long accountId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dca_id", nullable = false)
    private AllocationDca dca;

    @Column(name = "allocated_date", nullable = false)
    private LocalDateTime allocatedDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "case_status", nullable = false)
    private CaseStatus caseStatus;

    @Column(name = "priority_score", precision = 10, scale = 2)
    private BigDecimal priorityScore;

    @Column(name = "current_owner", nullable = false)
    private String currentOwner;

    // ===== getters & setters =====

    public Long getCaseId() {
        return caseId;
    }

    public Long getAccountId() {
        return accountId;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public AllocationDca getDca() {
        return dca;
    }

    public void setDca(AllocationDca dca) {
        this.dca = dca;
    }

    public LocalDateTime getAllocatedDate() {
        return allocatedDate;
    }

    public void setAllocatedDate(LocalDateTime allocatedDate) {
        this.allocatedDate = allocatedDate;
    }

    public CaseStatus getCaseStatus() {
        return caseStatus;
    }

    public void setCaseStatus(CaseStatus caseStatus) {
        this.caseStatus = caseStatus;
    }

    public BigDecimal getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(BigDecimal priorityScore) {
        this.priorityScore = priorityScore;
    }

    public String getCurrentOwner() {
        return currentOwner;
    }

    public void setCurrentOwner(String currentOwner) {
        this.currentOwner = currentOwner;
    }
}
