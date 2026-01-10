package com.example.serverapp.allocation.repository;
import com.example.serverapp.allocation.model.AllocationDca;
import com.example.serverapp.ai_priority.enums.DcaStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlloDcaRepository extends JpaRepository<AllocationDca, Long> {

    List<AllocationDca> findByRegionIdAndStatus(Long regionId, DcaStatus status);
}

