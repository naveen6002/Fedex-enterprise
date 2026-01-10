package com.example.serverapp.allocation.repository;

import com.example.serverapp.allocation.dto.Allocation_EligibleAccount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

public interface AlloEligibleAccountRepository
        extends PagingAndSortingRepository<Allocation_EligibleAccount, Long> {

    @Query(
        value = """
            SELECT *
            FROM vw_eligible_accounts_for_allocation
            WHERE region_id = :regionId
        """,
        countQuery = """
            SELECT COUNT(*)
            FROM vw_eligible_accounts_for_allocation
            WHERE region_id = :regionId
        """,
        nativeQuery = true
    )
    Page<Allocation_EligibleAccount> findEligibleAccountsByRegion(
            @Param("regionId") Long regionId,
            Pageable pageable
    );
}
