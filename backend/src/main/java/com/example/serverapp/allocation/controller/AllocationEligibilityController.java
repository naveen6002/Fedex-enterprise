// EligibilityController.java

package com.example.serverapp.allocation.controller;

import com.example.serverapp.allocation.dto.Allocation_EligibleAccount;
import com.example.serverapp.allocation.service.AllocationEligibilityService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/eligibility")
public class AllocationEligibilityController {

    private final AllocationEligibilityService service;

    public AllocationEligibilityController(AllocationEligibilityService service) {
        this.service = service;
    }

    @GetMapping("/{regionId}")
    public Page<Allocation_EligibleAccount> getEligible(
            @PathVariable Long regionId,
            Pageable pageable) {

        return service.getEligibleAccounts(regionId, pageable);
    }
}
