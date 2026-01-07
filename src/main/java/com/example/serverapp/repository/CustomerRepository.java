package com.example.serverapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.serverapp.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
