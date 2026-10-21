package com.gramseva.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
@Data
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // COMPLAINT NUMBER
    // =====================================================

    @Column(
            name = "complaint_number",
            unique = true,
            nullable = false
    )
    private String complaintNumber;


    // =====================================================
    // CITIZEN INFORMATION
    // =====================================================

    @Column(
            name = "village_id",
            nullable = false
    )
    private String villageId;

    @Column(
            name = "citizen_name",
            nullable = false
    )
    private String citizenName;

    @Column(
            nullable = false
    )
    private String mobile;

    private String email;


    // =====================================================
    // COMPLAINT INFORMATION
    // =====================================================

    @Column(
            nullable = false
    )
    private String subject;

    @Column(
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String description;

    @Column(
            nullable = false
    )
    private String location;


    // =====================================================
    // DEPARTMENT
    // =====================================================

    @Column(name = "department")
    private String department;


    // =====================================================
    // CLASSIFICATION
    // =====================================================

    private String category;

    private String priority;


    // =====================================================
    // AI CLASSIFICATION
    // =====================================================

    @Column(name = "ai_category")
    private String aiCategory;

    @Column(name = "ai_priority")
    private String aiPriority;

    @Column(name = "ai_confidence")
    private Double aiConfidence;

    @Column(name = "ai_verified")
    private Boolean aiVerified = false;


    // =====================================================
    // COMPLAINT STATUS
    // =====================================================

    @Column(
            nullable = false
    )
    private String status = "SUBMITTED";


    // =====================================================
    // OFFICER INFORMATION
    // =====================================================

    private String assignedOfficer;

    @Column(
            name = "officer_remarks",
            columnDefinition = "TEXT"
    )
    private String officerRemarks;


    // =====================================================
    // DATES
    // =====================================================

    @Column(
            name = "created_at",
            nullable = false
    )
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;


    // =====================================================
    // AUTOMATIC DATE HANDLING
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        if (createdAt == null) {
            createdAt = now;
        }

        if (updatedAt == null) {
            updatedAt = now;
        }

        if (aiVerified == null) {
            aiVerified = false;
        }

        if (status == null || status.isBlank()) {
            status = "SUBMITTED";
        }
    }


    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}