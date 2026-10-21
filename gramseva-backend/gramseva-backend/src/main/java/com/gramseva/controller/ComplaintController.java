package com.gramseva.controller;

import com.gramseva.dto.AIClassificationResponse;
import com.gramseva.dto.ComplaintRequest;
import com.gramseva.dto.ComplaintResponse;
import com.gramseva.dto.OfficerDashboardResponse;
import com.gramseva.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(originPatterns = "*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;


    // =====================================================
    // SUBMIT COMPLAINT
    // =====================================================

    @PostMapping
    public ResponseEntity<ComplaintResponse> submitComplaint(
            @RequestBody ComplaintRequest request) {

        return ResponseEntity.ok(
                complaintService.submitComplaint(request)
        );
    }


    // =====================================================
    // GET ALL COMPLAINTS
    // =====================================================

    @GetMapping
    public ResponseEntity<List<ComplaintResponse>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }


    // =====================================================
    // GET COMPLAINTS BY VILLAGE
    // =====================================================

    @GetMapping("/village/{villageId}")
    public ResponseEntity<List<ComplaintResponse>> getByVillage(
            @PathVariable String villageId) {

        return ResponseEntity.ok(
                complaintService.getComplaintsByVillage(villageId)
        );
    }


    // =====================================================
    // GET COMPLAINTS BY MOBILE
    // =====================================================

    @GetMapping("/citizen/{mobile}")
    public ResponseEntity<List<ComplaintResponse>> getByMobile(
            @PathVariable String mobile) {

        return ResponseEntity.ok(
                complaintService.getComplaintsByMobile(mobile)
        );
    }


    // =====================================================
    // GET COMPLAINT BY NUMBER
    // =====================================================

    @GetMapping("/{complaintNumber}")
    public ResponseEntity<ComplaintResponse> getComplaint(
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.getComplaintByNumber(
                        complaintNumber
                )
        );
    }


    // =====================================================
    // UPDATE COMPLAINT STATUS
    // =====================================================

    @PutMapping("/{complaintNumber}/status")
    public ResponseEntity<ComplaintResponse> updateStatus(
            @PathVariable String complaintNumber,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.updateComplaintStatus(
                        complaintNumber,
                        status
                )
        );
    }


    // =====================================================
    // ASSIGN OFFICER
    // =====================================================

    @PutMapping("/{complaintNumber}/assign")
    public ResponseEntity<ComplaintResponse> assignOfficer(
            @PathVariable String complaintNumber,
            @RequestParam String officerId) {

        return ResponseEntity.ok(
                complaintService.assignOfficer(
                        complaintNumber,
                        officerId
                )
        );
    }


    // =====================================================
    // ADD OFFICER REMARKS
    // =====================================================

    @PutMapping("/{complaintNumber}/remarks")
    public ResponseEntity<ComplaintResponse> addOfficerRemarks(
            @PathVariable String complaintNumber,
            @RequestParam String remarks) {

        return ResponseEntity.ok(
                complaintService.addOfficerRemarks(
                        complaintNumber,
                        remarks
                )
        );
    }


    // =====================================================
    // AI CLASSIFICATION
    // =====================================================

    @PostMapping("/{complaintNumber}/classify")
    public ResponseEntity<AIClassificationResponse> classifyComplaint(
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.classifyComplaint(
                        complaintNumber
                )
        );
    }


    // =====================================================
    // OFFICER
    // GET ALL ASSIGNED COMPLAINTS
    // =====================================================

    @GetMapping("/officer/{officerId}")
    public ResponseEntity<List<ComplaintResponse>> getOfficerComplaints(
            @PathVariable String officerId) {

        return ResponseEntity.ok(
                complaintService.getOfficerComplaints(
                        officerId
                )
        );
    }


    // =====================================================
    // OFFICER
    // GET COMPLAINTS BY STATUS
    // =====================================================

    @GetMapping("/officer/{officerId}/status")
    public ResponseEntity<List<ComplaintResponse>>
    getOfficerComplaintsByStatus(
            @PathVariable String officerId,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.getOfficerComplaintsByStatus(
                        officerId,
                        status
                )
        );
    }


    // =====================================================
    // OFFICER
    // GET SINGLE COMPLAINT
    // =====================================================

    @GetMapping("/officer/{officerId}/{complaintNumber}")
    public ResponseEntity<ComplaintResponse> getOfficerComplaint(
            @PathVariable String officerId,
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.getOfficerComplaint(
                        officerId,
                        complaintNumber
                )
        );
    }


    // =====================================================
    // OFFICER
    // UPDATE STATUS
    // =====================================================

    @PutMapping(
            "/officer/{officerId}/{complaintNumber}/status"
    )
    public ResponseEntity<ComplaintResponse>
    updateOfficerComplaintStatus(
            @PathVariable String officerId,
            @PathVariable String complaintNumber,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.updateOfficerComplaintStatus(
                        officerId,
                        complaintNumber,
                        status
                )
        );
    }


    // =====================================================
    // OFFICER
    // ADD REMARKS
    // =====================================================

    @PutMapping(
            "/officer/{officerId}/{complaintNumber}/remarks"
    )
    public ResponseEntity<ComplaintResponse>
    addOfficerComplaintRemarks(
            @PathVariable String officerId,
            @PathVariable String complaintNumber,
            @RequestParam String remarks) {

        return ResponseEntity.ok(
                complaintService.addOfficerComplaintRemarks(
                        officerId,
                        complaintNumber,
                        remarks
                )
        );
    }


    // =====================================================
    // DEPARTMENT
    // GET ALL DEPARTMENT COMPLAINTS
    // =====================================================

    @GetMapping("/department/{department}")
    public ResponseEntity<List<ComplaintResponse>>
    getDepartmentComplaints(
            @PathVariable String department) {

        return ResponseEntity.ok(
                complaintService.getDepartmentComplaints(
                        department
                )
        );
    }


    // =====================================================
    // DEPARTMENT
    // GET COMPLAINTS BY STATUS
    // =====================================================

    @GetMapping("/department/{department}/status")
    public ResponseEntity<List<ComplaintResponse>>
    getDepartmentComplaintsByStatus(
            @PathVariable String department,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.getDepartmentComplaintsByStatus(
                        department,
                        status
                )
        );
    }


    // =====================================================
    // DEPARTMENT
    // GET SINGLE COMPLAINT
    // =====================================================

    @GetMapping(
            "/department/{department}/{complaintNumber}"
    )
    public ResponseEntity<ComplaintResponse>
    getDepartmentComplaint(
            @PathVariable String department,
            @PathVariable String complaintNumber) {

        return ResponseEntity.ok(
                complaintService.getDepartmentComplaint(
                        department,
                        complaintNumber
                )
        );
    }


    // =====================================================
    // DEPARTMENT
    // UPDATE STATUS
    // =====================================================

    @PutMapping(
            "/department/{department}/{complaintNumber}/status"
    )
    public ResponseEntity<ComplaintResponse>
    updateDepartmentComplaintStatus(
            @PathVariable String department,
            @PathVariable String complaintNumber,
            @RequestParam String status) {

        return ResponseEntity.ok(
                complaintService.updateDepartmentComplaintStatus(
                        department,
                        complaintNumber,
                        status
                )
        );
    }


    // =====================================================
    // DEPARTMENT
    // ADD REMARKS
    // =====================================================

    @PutMapping(
            "/department/{department}/{complaintNumber}/remarks"
    )
    public ResponseEntity<ComplaintResponse>
    addDepartmentComplaintRemarks(
            @PathVariable String department,
            @PathVariable String complaintNumber,
            @RequestParam String remarks) {

        return ResponseEntity.ok(
                complaintService.addDepartmentComplaintRemarks(
                        department,
                        complaintNumber,
                        remarks
                )
        );
    }


    // =====================================================
    // OFFICER DASHBOARD
    // =====================================================

    @GetMapping("/officer/{officerId}/dashboard")
    public ResponseEntity<OfficerDashboardResponse>
    getOfficerDashboard(
            @PathVariable String officerId) {

        return ResponseEntity.ok(
                complaintService.getOfficerDashboard(
                        officerId
                )
        );
    }


    // =====================================================
    // DEPARTMENT DASHBOARD
    // =====================================================

    @GetMapping("/department/{department}/dashboard")
    public ResponseEntity<OfficerDashboardResponse>
    getDepartmentDashboard(
            @PathVariable String department) {

        return ResponseEntity.ok(
                complaintService.getDepartmentDashboard(
                        department
                )
        );
    }
}