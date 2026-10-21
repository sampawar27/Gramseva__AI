package com.gramseva.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "income_certificate")
@Data
public class IncomeCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "application_number", unique = true, nullable = false)
    private String applicationNumber;


    @Column(name = "village_id", nullable = false)
    private String villageId;


    @Column(name = "applicant_name", nullable = false)
    private String applicantName;


    @Column(name = "father_name", nullable = false)
    private String fatherName;


    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;


    @Column(nullable = false)
    private String gender;


    @Column(nullable = false)
    private String mobile;


    private String email;


    private String occupation;


    @Column(name = "annual_income", nullable = false)
    private Double annualIncome;


    @Column(name = "income_source")
    private String incomeSource;


    private String village;


    private String taluka;


    private String district;


    private String state;


    private String pincode;


    private String purpose;


    @Column(nullable = false)
    private String status;


    @Column(name = "applied_date")
    private LocalDateTime appliedDate;


    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}