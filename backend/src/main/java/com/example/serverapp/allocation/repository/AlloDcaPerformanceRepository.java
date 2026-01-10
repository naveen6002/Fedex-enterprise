package com.example.serverapp.allocation.repository;

import com.example.serverapp.allocation.model.AllocationDcaPerformanceMetric;
import com.example.serverapp.ai_priority.enums.Period;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AlloDcaPerformanceRepository
        extends JpaRepository<AllocationDcaPerformanceMetric, Long> {

    @Query("""
        SELECT m FROM AllocationDcaPerformanceMetric m
        WHERE m.dca.dcaId = :dcaId
          AND m.period = :period
        ORDER BY m.metricId DESC
    """)
    Optional<AllocationDcaPerformanceMetric> findLatestMetric(
            @Param("dcaId") Long dcaId,
            @Param("period") Period period
    );
}
