package com.example.serverapp.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.example.serverapp.repository.CustomerRepository;
import com.example.serverapp.model.Customer;

@RestController
@RequestMapping("/db-test")
public class CustomerTestController {

    private final CustomerRepository repository;

    public CustomerTestController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }
}
