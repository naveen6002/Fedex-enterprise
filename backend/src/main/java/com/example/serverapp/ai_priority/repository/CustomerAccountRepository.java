package com.example.serverapp.ai_priority.repository;

import com.example.serverapp.ai_priority.model.CustomerAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CustomerAccountRepository
        extends JpaRepository<CustomerAccount, Long> {

    @Query("""
        SELECT ca.customer.customerId
        FROM CustomerAccount ca
        WHERE ca.accountId = :accountId
    """)
    Optional<Long> findCustomerIdByAccountId(
            @Param("accountId") Long accountId
    );

    @Query("""
        SELECT c.regionId
        FROM CustomerAccount ca
        JOIN ca.customer c
        WHERE ca.accountId = :accountId
    """)
    Optional<Long> findCustomerRegionByAccountId(
            @Param("accountId") Long accountId
    );
}
