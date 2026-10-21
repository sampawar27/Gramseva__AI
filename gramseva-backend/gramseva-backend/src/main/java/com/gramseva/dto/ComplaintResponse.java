package com.gramseva.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ComplaintResponse {

    private Long id;

    private String complaintNumber;

    private String villageId;

    private String citizenName;

    private String mobile;

    private String email;

    private String subject;

    private String description;

    private String location;

    private String category;

    private String priority;

    private String aiCategory;

    private String aiPriority;

    private Double aiConfidence;

    private String department;

    private Boolean aiVerified;

    private String status;

    private String assignedOfficer;

    private String officerRemarks;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private LocalDateTime resolvedAt;
}