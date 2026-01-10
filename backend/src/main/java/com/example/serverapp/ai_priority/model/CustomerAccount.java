package com.example.serverapp.ai_priority.model;

import com.example.serverapp.ai_priority.enums.AgeingBucket;
import com.example.serverapp.ai_priority.enums.CollectionStage;
import jakarta.persistence.*;

@Entity
@Table(name = "customer_accounts")
public class CustomerAccount {

    @Id
    @Column(name = "account_id")
    private Long accountId;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;

    private Double outstandingAmount;
    private Double delinquencyScore;

    @Column(name = "ageing_bucket")
    private AgeingBucket ageingBucket;

    

    @Enumerated(EnumType.STRING)
    private CollectionStage collectionStage;

    public Customer getCustomer() { 
                return customer; 
                                    }

    public Long getAccountId() { return accountId; }
    public Long getCustomerId() { return customerId; }
    public Double getOutstandingAmount() { return outstandingAmount; }
    public Double getDelinquencyScore() { return delinquencyScore; }
    public AgeingBucket getAgeingBucket() { return ageingBucket; }
}
