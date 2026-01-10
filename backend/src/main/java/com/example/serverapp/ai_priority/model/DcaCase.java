package com.example.serverapp.ai_priority.model;

import com.example.serverapp.ai_priority.enums.CaseStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "dca_cases")
public class DcaCase {

    @Id
    @Column(name = "case_id")
    private Long caseId;

    @Column(name = "account_id")
    private Long accountId;

    // 🔗 Relationship mapping
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", insertable = false, updatable = false)
    private CustomerAccount account;

    @Enumerated(EnumType.STRING)
    @Column(name = "case_status")
    private CaseStatus caseStatus;

    @Column(name = "priority_score")
    private Double priorityScore;

    // getters & setters
    public Long getAccountId() {
        return accountId;
    }

    public Long getCaseId() {
        return caseId;
    }
    
    public CustomerAccount getAccount() {
        return account;
    }

    public Double getPriorityScore() {
        return priorityScore;
    }

    public void setPriorityScore(Double score) {
        this.priorityScore = score;
    }
}
