package com.example.serverapp.ai_priority.controller;
import com.example.serverapp.ai_priority.model.DcaCase;
import com.example.serverapp.ai_priority.repository.DcaCaseRepository;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cases")
public class DcaCaseController {

    private final DcaCaseRepository caseRepo;

    public DcaCaseController(DcaCaseRepository caseRepo) {
        this.caseRepo = caseRepo;
    }

    @PostMapping
public DcaCase createCase(@RequestBody @NonNull DcaCase dcaCase) {
    
    return caseRepo.save(dcaCase);
    }
}
