package com.example.serverapp.allocation.repository;

import com.example.serverapp.allocation.model.AllocationDcaCase;
import com.example.serverapp.ai_priority.enums.CaseStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;

public interface AllocationDcaCaseRepository
        extends JpaRepository<AllocationDcaCase, Long> {

    // ✅ Prevent duplicate allocation only for ACTIVE cases
    boolean existsByAccountIdAndCaseStatusIn(
            Long accountId,
            Collection<CaseStatus> statuses
    );
}
