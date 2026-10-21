package com.gramseva.service;

import com.gramseva.dto.AIClassificationResponse;
import com.gramseva.dto.ComplaintRequest;
import com.gramseva.dto.ComplaintResponse;
import com.gramseva.dto.OfficerDashboardResponse;

import java.util.List;

public interface ComplaintService {

    // =====================================================
    // CITIZEN
    // =====================================================

    ComplaintResponse submitComplaint(
            ComplaintRequest request
    );

    ComplaintResponse getComplaintByNumber(
            String complaintNumber
    );

    List<ComplaintResponse> getAllComplaints();

    List<ComplaintResponse> getAllComplaintsByStatus(
            String status
    );

    List<ComplaintResponse> getComplaintsByVillage(
            String villageId
    );

    List<ComplaintResponse> getComplaintsByMobile(
            String mobile
    );


    // =====================================================
    // COMPLAINT MANAGEMENT
    // =====================================================

    ComplaintResponse updateComplaintStatus(
            String complaintNumber,
            String status
    );

    ComplaintResponse assignOfficer(
            String complaintNumber,
            String officerId
    );

    ComplaintResponse addOfficerRemarks(
            String complaintNumber,
            String remarks
    );


    // =====================================================
    // AI
    // =====================================================

    AIClassificationResponse classifyComplaint(
            String complaintNumber
    );


    // =====================================================
    // OFFICER
    // =====================================================

    List<ComplaintResponse> getOfficerComplaints(
            String officerId
    );

    List<ComplaintResponse> getOfficerComplaintsByStatus(
            String officerId,
            String status
    );

    ComplaintResponse getOfficerComplaint(
            String officerId,
            String complaintNumber
    );

    ComplaintResponse updateOfficerComplaintStatus(
            String officerId,
            String complaintNumber,
            String status
    );

    ComplaintResponse addOfficerComplaintRemarks(
            String officerId,
            String complaintNumber,
            String remarks
    );


    // =====================================================
    // DEPARTMENT HEAD
    // =====================================================

    List<ComplaintResponse> getDepartmentComplaints(
            String department
    );

    List<ComplaintResponse> getDepartmentComplaintsByStatus(
            String department,
            String status
    );

    ComplaintResponse getDepartmentComplaint(
            String department,
            String complaintNumber
    );

    ComplaintResponse updateDepartmentComplaintStatus(
            String department,
            String complaintNumber,
            String status
    );

    ComplaintResponse addDepartmentComplaintRemarks(
            String department,
            String complaintNumber,
            String remarks
    );


    // =====================================================
    // DASHBOARD
    // =====================================================

    OfficerDashboardResponse getOfficerDashboard(
            String officerId
    );

    OfficerDashboardResponse getDepartmentDashboard(
            String department
    );
}