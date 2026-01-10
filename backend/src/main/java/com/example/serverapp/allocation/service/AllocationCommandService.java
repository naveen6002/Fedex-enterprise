package com.example.serverapp.allocation.service;

import com.example.serverapp.ai_priority.enums.CaseStatus;
import com.example.serverapp.allocation.enums.CustomerStatus;
import com.example.serverapp.allocation.model.AllocationDca;
import com.example.serverapp.allocation.model.AllocationDcaCase;
import com.example.serverapp.allocation.repository.AllocationDcaCaseRepository;
import com.example.serverapp.ai_priority.repository.CustomerAccountRepository;
import com.example.serverapp.ai_priority.model.Customer;
import com.example.serverapp.ai_priority.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AllocationCommandService {

    private final AllocationDcaCaseRepository caseRepository;
    private final CustomerAccountRepository accountRepository;
    private final CustomerRepository customerRepository;

    public AllocationCommandService(
            AllocationDcaCaseRepository caseRepository,
            CustomerAccountRepository accountRepository,
            CustomerRepository customerRepository
    ) {
        this.caseRepository = caseRepository;
        this.accountRepository = accountRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public void allocate(
            Long accountId,
            AllocationDca dca,
            BigDecimal priorityScore
    ) {

        // 1️⃣ Prevent duplicate ACTIVE allocation
        if (caseRepository.existsByAccountIdAndCaseStatusIn(
                accountId,
                List.of(CaseStatus.OPEN, CaseStatus.IN_PROGRESS)
        )) {
            throw new IllegalStateException("Account already allocated with active case");
        }

        // 2️⃣ Fetch customer region via account
        Long customerRegionId = accountRepository
                .findCustomerRegionByAccountId(accountId)
                .orElseThrow(() -> new IllegalStateException("Customer account not found"));

        // 3️⃣ Region validation
        if (!customerRegionId.equals(dca.getRegionId())) {
            throw new IllegalStateException("Region mismatch between customer and DCA");
        }

        // 4️⃣ Create DCA case
        AllocationDcaCase dc = new AllocationDcaCase();
        dc.setAccountId(accountId);
        dc.setDca(dca);
        dc.setAllocatedDate(LocalDateTime.now());
        dc.setPriorityScore(priorityScore);
        dc.setCaseStatus(CaseStatus.OPEN);
        dc.setCurrentOwner("SYSTEM"); // 🔥 CRITICAL FIX

        caseRepository.save(dc);

        // 5️⃣ Update customer status
        Long customerId = accountRepository
                .findCustomerIdByAccountId(accountId)
                .orElseThrow(() -> new IllegalStateException("Customer account not found"));

        Customer customer = customerRepository
                .findById(customerId)
                .orElseThrow(() -> new IllegalStateException("Customer not found"));

        customer.setStatus(CustomerStatus.IN_COLLECTIONS);
        customerRepository.save(customer);
    }
}
