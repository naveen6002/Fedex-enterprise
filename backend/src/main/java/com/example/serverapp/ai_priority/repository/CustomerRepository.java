package com.example.serverapp.ai_priority.repository;

import com.example.serverapp.ai_priority.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {}
