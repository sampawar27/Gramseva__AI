package com.gramseva.repository;

import com.gramseva.entity.Complaint;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Long> {

    // =====================================================
    // GENERAL COMPLAINT SEARCH
    // =====================================================

    Optional<Complaint> findByComplaintNumber(
            String complaintNumber
    );

    List<Complaint> findByVillageId(
            String villageId
    );

    List<Complaint> findByMobile(
            String mobile
    );

    // =====================================================
    // GENERAL STATUS SEARCH
    // =====================================================

    List<Complaint> findByStatus(
            String status
    );

    // =====================================================
    // OFFICER ASSIGNMENT
    // =====================================================

    List<Complaint> findByAssignedOfficer(
            String officerId
    );

    List<Complaint> findByAssignedOfficerAndStatus(
            String officerId,
            String status
    );

    // =====================================================
    // DEPARTMENT
    // =====================================================

    List<Complaint> findByDepartment(
            String department
    );

    List<Complaint> findByDepartmentAndStatus(
            String department,
            String status
    );

    // =====================================================
    // COUNTS - ASSIGNED OFFICER
    // =====================================================

    long countByAssignedOfficer(
            String officerId
    );

    long countByAssignedOfficerAndStatus(
            String officerId,
            String status
    );

    // =====================================================
    // COUNTS - DEPARTMENT
    // =====================================================

    long countByDepartment(
            String department
    );

    long countByDepartmentAndStatus(
            String department,
            String status
    );

    // =====================================================
    // GENERAL COUNTS
    // =====================================================

    long countByStatus(
            String status
    );
}