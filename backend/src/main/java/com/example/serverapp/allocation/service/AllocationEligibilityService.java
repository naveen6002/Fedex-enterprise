package com.example.serverapp.allocation.service;

import com.example.serverapp.allocation.dto.Allocation_EligibleAccount;
import com.example.serverapp.allocation.repository.AlloEligibleAccountRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class AllocationEligibilityService {

    private final AlloEligibleAccountRepository repository;

    public AllocationEligibilityService(AlloEligibleAccountRepository repository) {
        this.repository = repository;
    }

    public Page<Allocation_EligibleAccount> getEligibleAccounts(
            Long regionId,
            Pageable pageable) {

        return repository.findEligibleAccountsByRegion(regionId, pageable);
    }
}

