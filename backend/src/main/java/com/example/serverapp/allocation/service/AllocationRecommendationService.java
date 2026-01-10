package com.example.serverapp.allocation.service;

import com.example.serverapp.allocation.model.AllocationDca;
import com.example.serverapp.allocation.model.AllocationDcaPerformanceMetric;
import com.example.serverapp.allocation.dto.Allocation_EligibleAccount;
import com.example.serverapp.allocation.repository.AlloDcaPerformanceRepository;
import com.example.serverapp.allocation.repository.AlloDcaRepository;
import com.example.serverapp.ai_priority.enums.DcaStatus;
import com.example.serverapp.ai_priority.enums.Period;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

@Service
public class AllocationRecommendationService {

    private final AlloDcaRepository dcaRepository;
    private final AlloDcaPerformanceRepository performanceRepository;

    public AllocationRecommendationService(
            AlloDcaRepository dcaRepository,
            AlloDcaPerformanceRepository performanceRepository) {
        this.dcaRepository = dcaRepository;
        this.performanceRepository = performanceRepository;
    }

    // 🔹 Rank DCAs by performance (Recovery Rate)
    public List<AllocationDca> rankedDcas(Long regionId) {

        List<AllocationDca> dcas =
                dcaRepository.findByRegionIdAndStatus(regionId, DcaStatus.ACTIVE);

        if (dcas.isEmpty()) {
            throw new IllegalStateException("No active DCAs found for region");
        }

        dcas.sort(Comparator.comparing(
                d -> performanceRepository
                        .findLatestMetric(d.getDcaId(), Period.MONTH)
                        .map(AllocationDcaPerformanceMetric::getRecoveryRate)
                        .orElse(BigDecimal.ZERO),
                Comparator.reverseOrder()
        ));

        return dcas;
    }

    // 🔹 Pick DCA (simple round-robin on ranked list)
    public AllocationDca recommendDca(
            Allocation_EligibleAccount account,
            List<AllocationDca> rankedDcas,
            int index) {

        return rankedDcas.get(index % rankedDcas.size());
    }
}
