package com.gramseva.controller;

import com.gramseva.dto.OfficerDashboardResponse;
import com.gramseva.entity.User;
import com.gramseva.repository.ComplaintRepository;
import com.gramseva.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/officer")
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerDashboardController {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // OFFICER DASHBOARD
    // =====================================================

    @GetMapping("/dashboard")
    public ResponseEntity<OfficerDashboardResponse> dashboard(
            Authentication authentication) {

        String officerId = authentication.getName();

        User officer = userRepository
                .findByOfficerId(officerId)
                .orElse(null);

        OfficerDashboardResponse response =
                new OfficerDashboardResponse();

        response.setSuccess(true);

        response.setMessage(
                "Officer dashboard loaded successfully"
        );

        response.setOfficerId(officerId);

        if (officer != null) {
            response.setOfficerName(
                    officer.getFullName()
            );
        }


        // =================================================
        // COMPLAINT COUNTS
        // =================================================

        long total =
                complaintRepository
                        .countByAssignedOfficer(officerId);

        long assigned =
                complaintRepository
                        .countByAssignedOfficerAndStatus(
                                officerId,
                                "ASSIGNED"
                        );

        long pending =
                complaintRepository
                        .countByAssignedOfficerAndStatus(
                                officerId,
                                "PENDING"
                        );

        long inProgress =
                complaintRepository
                        .countByAssignedOfficerAndStatus(
                                officerId,
                                "IN_PROGRESS"
                        );

        long resolved =
                complaintRepository
                        .countByAssignedOfficerAndStatus(
                                officerId,
                                "RESOLVED"
                        );

        long submitted =
                complaintRepository
                        .countByAssignedOfficerAndStatus(
                                officerId,
                                "SUBMITTED"
                        );


        // =================================================
        // SET COUNTS
        // =================================================

        response.setTotalComplaints(total);

        response.setAssignedComplaints(assigned);

        response.setPendingComplaints(pending);

        response.setInProgressComplaints(inProgress);

        response.setResolvedComplaints(resolved);

        response.setSubmittedComplaints(submitted);


        return ResponseEntity.ok(response);
    }
}