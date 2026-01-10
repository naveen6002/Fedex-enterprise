package com.example.serverapp.ai_priority.repository;

import com.example.serverapp.ai_priority.enums.CaseStatus;
import com.example.serverapp.ai_priority.model.DcaCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

public interface DcaCaseRepository extends JpaRepository<DcaCase, Long> {

    @EntityGraph(attributePaths = {
            "account",
            "account.customer"
    })
    @Query("""
                SELECT dc
                FROM DcaCase dc
                WHERE dc.caseStatus = :status
    """)
    Page<DcaCase> findOpenCasesWithDetails( 
        @Param("status") CaseStatus status,
        Pageable pageable

    );

}
