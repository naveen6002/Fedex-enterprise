package com.example.serverapp.ai_priority.repository;

import com.example.serverapp.ai_priority.model.DcaPerformanceMetric;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DcaPerformanceRepository extends JpaRepository<DcaPerformanceMetric, Long> {}
