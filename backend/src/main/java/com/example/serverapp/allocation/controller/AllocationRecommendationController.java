package com.example.serverapp.allocation.controller;

import com.example.serverapp.allocation.dto.AllocationRecommendationDTO;
import com.example.serverapp.allocation.service.AllocationEligibilityService;
import com.example.serverapp.allocation.service.AllocationRecommendationService;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/recommendation")
public class AllocationRecommendationController {

    private final AllocationEligibilityService eligibilityService;
    private final AllocationRecommendationService recommendationService;

    public AllocationRecommendationController(
            AllocationEligibilityService eligibilityService,
            AllocationRecommendationService recommendationService) {
        this.eligibilityService = eligibilityService;
        this.recommendationService = recommendationService;
    }

    @GetMapping("/{regionId}")
    public List<AllocationRecommendationDTO> recommend(
            @PathVariable Long regionId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        var pageable = PageRequest.of(page, size);

        var eligibleAccounts =
                eligibilityService.getEligibleAccounts(regionId, pageable)
                                  .getContent();

        var rankedDcas =
                recommendationService.rankedDcas(regionId);

        List<AllocationRecommendationDTO> result = new ArrayList<>();

        for (int i = 0; i < eligibleAccounts.size(); i++) {
            var account = eligibleAccounts.get(i);
            var dca = recommendationService
                    .recommendDca(account, rankedDcas, i);

            result.add(new AllocationRecommendationDTO(
                    account.getAccountId(),
                    dca.getDcaId(),
                    dca.getDcaName(),
                    "REGION_MATCH + BEST_RECOVERY_RATE"
            ));
        }

        return result;
    }
}
