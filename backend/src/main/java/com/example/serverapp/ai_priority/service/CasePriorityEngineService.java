package com.example.serverapp.ai_priority.service;

import com.example.serverapp.ai_priority.dto.CasePriorityDTO;
import com.example.serverapp.ai_priority.enums.CaseStatus;
import com.example.serverapp.ai_priority.model.DcaCase;
import com.example.serverapp.ai_priority.repository.DcaCaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class CasePriorityEngineService {

    private final DcaCaseRepository caseRepo;

    public CasePriorityEngineService(DcaCaseRepository caseRepo) {
        this.caseRepo = caseRepo;
    }

    @Transactional
    public Page<CasePriorityDTO> runCasePriorityEngine(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<DcaCase> cases =
                caseRepo.findOpenCasesWithDetails(CaseStatus.OPEN, pageable);

        if (cases.isEmpty()) {
            return Page.empty();
        }

        return cases.map(dc -> {

            Double outstandingObj =
                    (dc.getAccount() != null)
                            ? dc.getAccount().getOutstandingAmount()
                            : 0.0;

            double outstanding = outstandingObj != null ? outstandingObj : 0.0;

            int riskOrdinal =
                    (dc.getAccount() != null &&
                     dc.getAccount().getCustomer() != null &&
                     dc.getAccount().getCustomer().getRiskSegment() != null)
                            ? dc.getAccount().getCustomer().getRiskSegment().ordinal()
                            : 0;

            double score = outstanding * 0.4 + riskOrdinal * 20;

            dc.setPriorityScore(score);

            return new CasePriorityDTO(
                    dc.getCaseId(),
                    dc.getAccount() != null ? dc.getAccount().getAccountId() : null,
                    outstanding,
                    (dc.getAccount() != null &&
                     dc.getAccount().getCustomer() != null &&
                     dc.getAccount().getCustomer().getRiskSegment() != null)
                            ? dc.getAccount().getCustomer().getRiskSegment().name()
                            : "UNKNOWN",
                    score
            );
        });
    }
}

