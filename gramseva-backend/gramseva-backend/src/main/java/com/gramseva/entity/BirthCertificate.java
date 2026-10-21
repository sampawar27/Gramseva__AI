package com.gramseva.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "birth_certificate")
@Data
public class BirthCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "application_number", unique = true, nullable = false)
    private String applicationNumber;

    @Column(name = "village_id", nullable = false)
    private String villageId;

    @Column(name = "applicant_name", nullable = false)
    private String applicantName;

    @Column(name = "child_name", nullable = false)
    private String childName;

    @Column(name = "father_name", nullable = false)
    private String fatherName;

    @Column(name = "mother_name", nullable = false)
    private String motherName;

    @Column(name = "child_dob", nullable = false)
    private LocalDate childDob;

    @Column(nullable = false)
    private String gender;

    @Column(name = "place_of_birth", nullable = false)
    private String placeOfBirth;

    @Column(nullable = false)
    private String mobile;

    private String email;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String purpose;

    private String status;

    @Column(name = "applied_date")
    private LocalDateTime appliedDate;
}