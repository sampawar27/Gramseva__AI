package com.gramseva.controller;

import com.gramseva.dto.ComplaintResponse;
import com.gramseva.dto.OfficerProfileResponse;
import com.gramseva.entity.User;
import com.gramseva.repository.UserRepository;
import com.gramseva.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/officer")
@CrossOrigin(originPatterns = "*")
public class OfficerController {

    @Autowired
    private ComplaintService complaintService;

    @Autowired
    private UserRepository userRepository;


    // =====================================================
    // TEST
    // =====================================================

    @GetMapping("/test")
    public String test() {

        return "Officer module is working";
    }


    // =====================================================
    // GET COMPLAINTS
    // =====================================================

    @GetMapping("/complaints")
    public ResponseEntity<List<ComplaintResponse>> getComplaints(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        // MAIN OFFICER
        // department = null / blank / ALL

        if (isMainOfficer(department)) {

            return ResponseEntity.ok(
                    complaintService.getAllComplaints()
            );
        }


        // DEPARTMENT OFFICER

        return ResponseEntity.ok(
                complaintService.getDepartmentComplaints(
                        department
                )
        );
    }


    // =====================================================
    // GET PENDING / SUBMITTED COMPLAINTS
    // =====================================================

    @GetMapping("/complaints/pending")
    public ResponseEntity<List<ComplaintResponse>>
    getPendingComplaints(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        if (isMainOfficer(department)) {

            return ResponseEntity.ok(
                    complaintService.getAllComplaintsByStatus(
                            "SUBMITTED"
                    )
            );
        }


        return ResponseEntity.ok(
                complaintService.getDepartmentComplaintsByStatus(
                        department,
                        "SUBMITTED"
                )
        );
    }


    // =====================================================
    // GET ASSIGNED COMPLAINTS
    // =====================================================

    @GetMapping("/complaints/assigned")
    public ResponseEntity<List<ComplaintResponse>>
    getAssignedComplaints(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        if (isMainOfficer(department)) {

            return ResponseEntity.ok(
                    complaintService.getAllComplaintsByStatus(
                            "ASSIGNED"
                    )
            );
        }


        return ResponseEntity.ok(
                complaintService.getDepartmentComplaintsByStatus(
                        department,
                        "ASSIGNED"
                )
        );
    }


    // =====================================================
    // GET IN-PROGRESS COMPLAINTS
    // =====================================================

    @GetMapping("/complaints/in-progress")
    public ResponseEntity<List<ComplaintResponse>>
    getInProgressComplaints(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        if (isMainOfficer(department)) {

            return ResponseEntity.ok(
                    complaintService.getAllComplaintsByStatus(
                            "IN_PROGRESS"
                    )
            );
        }


        return ResponseEntity.ok(
                complaintService.getDepartmentComplaintsByStatus(
                        department,
                        "IN_PROGRESS"
                )
        );
    }


    // =====================================================
    // GET RESOLVED COMPLAINTS
    // =====================================================

    @GetMapping("/complaints/resolved")
    public ResponseEntity<List<ComplaintResponse>>
    getResolvedComplaints(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        if (isMainOfficer(department)) {

            return ResponseEntity.ok(
                    complaintService.getAllComplaintsByStatus(
                            "RESOLVED"
                    )
            );
        }


        return ResponseEntity.ok(
                complaintService.getDepartmentComplaintsByStatus(
                        department,
                        "RESOLVED"
                )
        );
    }


    // =====================================================
    // GET SINGLE COMPLAINT
    // =====================================================

    @GetMapping("/complaints/{complaintNumber}")
    public ResponseEntity<ComplaintResponse> getComplaint(
            @PathVariable String complaintNumber,
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        ComplaintResponse complaint =
                complaintService.getComplaintByNumber(
                        complaintNumber
                );


        // MAIN OFFICER
        // Can view any complaint

        if (isMainOfficer(department)) {

            return ResponseEntity.ok(complaint);
        }


        // DEPARTMENT OFFICER
        // Can view only department complaints

        if (complaint.getDepartment() == null ||
                !department.equalsIgnoreCase(
                        complaint.getDepartment()
                )) {

            throw new RuntimeException(
                    "You are not authorized to view this complaint."
            );
        }


        return ResponseEntity.ok(complaint);
    }


    // =====================================================
    // UPDATE COMPLAINT STATUS
    // =====================================================

    @PutMapping("/complaints/{complaintNumber}/status")
    public ResponseEntity<ComplaintResponse> updateStatus(
            @PathVariable String complaintNumber,
            @RequestParam String status,
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        ComplaintResponse complaint =
                complaintService.getComplaintByNumber(
                        complaintNumber
                );


        // DEPARTMENT OFFICER

        if (!isMainOfficer(department)) {

            if (complaint.getDepartment() == null ||
                    !department.equalsIgnoreCase(
                            complaint.getDepartment()
                    )) {

                throw new RuntimeException(
                        "You can update only your department complaints."
                );
            }
        }


        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(
                        complaintNumber,
                        status
                )
        );
    }


    // =====================================================
    // ADD OFFICER REMARKS
    // =====================================================

    @PutMapping("/complaints/{complaintNumber}/remarks")
    public ResponseEntity<ComplaintResponse> addRemarks(
            @PathVariable String complaintNumber,
            @RequestParam String remarks,
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);

        String department =
                officer.getDepartment();


        ComplaintResponse complaint =
                complaintService.getComplaintByNumber(
                        complaintNumber
                );


        if (!isMainOfficer(department)) {

            if (complaint.getDepartment() == null ||
                    !department.equalsIgnoreCase(
                            complaint.getDepartment()
                    )) {

                throw new RuntimeException(
                        "You can add remarks only to your department complaints."
                );
            }
        }


        return ResponseEntity.ok(
                complaintService.addOfficerRemarks(
                        complaintNumber,
                        remarks
                )
        );
    }


    // =====================================================
    // OFFICER PROFILE
    // =====================================================

    @GetMapping("/profile")
    public ResponseEntity<OfficerProfileResponse> getProfile(
            Authentication authentication) {

        String officerId =
                authentication.getName();

        User officer =
                getOfficer(officerId);


        OfficerProfileResponse response =
                new OfficerProfileResponse();


        response.setId(
                officer.getId()
        );

        response.setOfficerId(
                officer.getOfficerId()
        );

        response.setFullName(
                officer.getFullName()
        );

        response.setFatherName(
                officer.getFatherName()
        );

        response.setMobile(
                officer.getMobile()
        );

        response.setEmail(
                officer.getEmail()
        );

        response.setVillage(
                officer.getVillage()
        );

        response.setTaluka(
                officer.getTaluka()
        );

        response.setDistrict(
                officer.getDistrict()
        );

        response.setState(
                officer.getState()
        );

        response.setPincode(
                officer.getPincode()
        );

        response.setRole(
                officer.getRole() == null
                        ? null
                        : officer.getRole().name()
        );

        response.setStatus(
                officer.getStatus() == null
                        ? null
                        : officer.getStatus().name()
        );

        response.setDepartment(
                officer.getDepartment()
        );


        return ResponseEntity.ok(response);
    }


    // =====================================================
    // HELPER - GET OFFICER
    // =====================================================

    private User getOfficer(
            String officerId) {

        return userRepository
                .findByOfficerId(officerId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Officer not found."
                        )
                );
    }


    // =====================================================
    // HELPER - MAIN OFFICER
    // =====================================================

    private boolean isMainOfficer(
            String department) {

        return department == null ||
                department.isBlank() ||
                department.equalsIgnoreCase("ALL");
    }
}