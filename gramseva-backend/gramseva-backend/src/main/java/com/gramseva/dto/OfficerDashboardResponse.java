package com.gramseva.dto;

import lombok.Data;

@Data
public class OfficerDashboardResponse {

    private boolean success;

    private String message;

    private String officerId;

    private String officerName;

    private long totalComplaints;

    private long pendingComplaints;

    private long assignedComplaints;

    private long resolvedComplaints;

    private long inProgressComplaints;

    private long submittedComplaints;
}