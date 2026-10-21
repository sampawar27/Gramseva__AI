package com.gramseva.service.impl;

import com.gramseva.dto.AIClassificationResponse;
import com.gramseva.dto.ComplaintRequest;
import com.gramseva.dto.ComplaintResponse;
import com.gramseva.dto.OfficerDashboardResponse;
import com.gramseva.entity.Complaint;
import com.gramseva.repository.ComplaintRepository;
import com.gramseva.service.ComplaintService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    // =====================================================
    // CITIZEN - SUBMIT COMPLAINT
    // =====================================================

    @Override
    public ComplaintResponse submitComplaint(ComplaintRequest request) {

        if (request == null) {
            throw new RuntimeException("Complaint data is required.");
        }

        Complaint complaint = new Complaint();

        complaint.setComplaintNumber(generateComplaintNumber());

        complaint.setVillageId(request.getVillageId());
        complaint.setCitizenName(request.getCitizenName());
        complaint.setMobile(request.getMobile());
        complaint.setEmail(request.getEmail());
        complaint.setSubject(request.getSubject());
        complaint.setDescription(request.getDescription());
        complaint.setLocation(request.getLocation());

        complaint.setStatus("SUBMITTED");
        complaint.setAiVerified(false);

        complaint.setCreatedAt(LocalDateTime.now());
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint saved = complaintRepository.save(complaint);

        return convertToResponse(saved);
    }

    // =====================================================
    // GET COMPLAINT BY NUMBER
    // =====================================================

    @Override
    public ComplaintResponse getComplaintByNumber(String complaintNumber) {

        Complaint complaint = findComplaint(complaintNumber);

        return convertToResponse(complaint);
    }

    // =====================================================
    // GET ALL COMPLAINTS
    // =====================================================

    @Override
    public List<ComplaintResponse> getAllComplaints() {

        return complaintRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET ALL COMPLAINTS BY STATUS
    // =====================================================

    @Override
    public List<ComplaintResponse> getAllComplaintsByStatus(String status) {

        validateStatus(status);

        return complaintRepository
                .findByStatus(status.trim().toUpperCase())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET COMPLAINTS BY VILLAGE
    // =====================================================

    @Override
    public List<ComplaintResponse> getComplaintsByVillage(String villageId) {

        if (villageId == null || villageId.isBlank()) {
            throw new RuntimeException("Village ID is required.");
        }

        return complaintRepository
                .findByVillageId(villageId.trim())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET COMPLAINTS BY MOBILE
    // =====================================================

    @Override
    public List<ComplaintResponse> getComplaintsByMobile(String mobile) {

        if (mobile == null || mobile.isBlank()) {
            throw new RuntimeException("Mobile number is required.");
        }

        return complaintRepository
                .findByMobile(mobile.trim())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // UPDATE COMPLAINT STATUS
    // =====================================================

    @Override
    public ComplaintResponse updateComplaintStatus(
            String complaintNumber,
            String status) {

        Complaint complaint = findComplaint(complaintNumber);

        validateStatus(status);

        String newStatus = status.trim().toUpperCase();

        complaint.setStatus(newStatus);
        complaint.setUpdatedAt(LocalDateTime.now());

        if ("RESOLVED".equals(newStatus)) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        if ("REOPENED".equals(newStatus)) {
            complaint.setResolvedAt(null);
        }

        Complaint updated = complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // ASSIGN OFFICER
    // =====================================================

    @Override
    public ComplaintResponse assignOfficer(
            String complaintNumber,
            String officerId) {

        Complaint complaint = findComplaint(complaintNumber);

        validateOfficerId(officerId);

        complaint.setAssignedOfficer(officerId.trim());
        complaint.setStatus("ASSIGNED");
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint updated = complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // ADD OFFICER REMARKS
    // =====================================================

    @Override
    public ComplaintResponse addOfficerRemarks(
            String complaintNumber,
            String remarks) {

        Complaint complaint = findComplaint(complaintNumber);

        validateRemarks(remarks);

        complaint.setOfficerRemarks(remarks.trim());
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint updated = complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // AI CLASSIFICATION
    // =====================================================

    @Override
    public AIClassificationResponse classifyComplaint(
            String complaintNumber) {

        Complaint complaint = findComplaint(complaintNumber);

        String subject = complaint.getSubject() == null
                ? ""
                : complaint.getSubject();

        String description = complaint.getDescription() == null
                ? ""
                : complaint.getDescription();

        String text = (subject + " " + description)
                .toLowerCase();

        String category;
        String priority;
        String department;
        double confidence;

        // =================================================
        // WATER
        // =================================================

        if (containsAny(
                text,
                "water",
                "pipeline",
                "tap",
                "drinking water",
                "water supply")) {

            category = "WATER";
            department = "Water Department";
            confidence = 0.92;
        }

        // =================================================
        // ELECTRICITY
        // =================================================

        else if (containsAny(
                text,
                "electricity",
                "electric",
                "light",
                "power",
                "transformer")) {

            category = "ELECTRICITY";
            department = "Electricity Department";
            confidence = 0.91;
        }

        // =================================================
        // HEALTH
        // =================================================

        else if (containsAny(
                text,
                "hospital",
                "health",
                "doctor",
                "medical",
                "medicine")) {

            category = "HEALTH";
            department = "Health Department";
            confidence = 0.86;
        }

        // =================================================
        // SANITATION
        // =================================================

        else if (containsAny(
                text,
                "garbage",
                "waste",
                "cleaning",
                "sanitation",
                "dustbin",
                "drain",
                "sewer",
                "drainage",
                "sewage")) {

            category = "SANITATION";
            department = "Sanitation Department";
            confidence = 0.89;
        }

        // =================================================
        // ROAD
        // =================================================

        else if (containsAny(
                text,
                "road",
                "pothole",
                "street",
                "road damage",
                "road broken")) {

            category = "ROAD";
            department = "Roads Department";
            confidence = 0.90;
        }

        // =================================================
        // AGRICULTURE
        // =================================================

        else if (containsAny(
                text,
                "farmer",
                "agriculture",
                "crop",
                "farming",
                "irrigation",
                "fertilizer",
                "seed")) {

            category = "AGRICULTURE";
            department = "Agriculture Department";
            confidence = 0.88;
        }

        // =================================================
        // EDUCATION
        // =================================================

        else if (containsAny(
                text,
                "school",
                "teacher",
                "education",
                "college",
                "student")) {

            category = "EDUCATION";
            department = "Education Department";
            confidence = 0.87;
        }

        // =================================================
        // REVENUE
        // =================================================

        else if (containsAny(
                text,
                "revenue",
                "land",
                "property",
                "tax",
                "income certificate",
                "7/12",
                "record")) {

            category = "REVENUE";
            department = "Revenue Department";
            confidence = 0.85;
        }

        // =================================================
        // WOMEN & CHILD WELFARE
        // =================================================

        else if (containsAny(
                text,
                "women",
                "child",
                "welfare",
                "anganwadi",
                "pregnancy",
                "nutrition")) {

            category = "WOMEN_CHILD_WELFARE";
            department = "Women & Child Welfare Department";
            confidence = 0.86;
        }

        // =================================================
        // OTHER
        // =================================================

        else {

            category = "OTHER";
            department = "General Administration";
            confidence = 0.60;
        }

        // =================================================
        // PRIORITY
        // =================================================

        if (containsAny(
                text,
                "urgent",
                "emergency",
                "danger",
                "accident",
                "critical",
                "life threatening")) {

            priority = "HIGH";
        }

        else if (containsAny(
                text,
                "not working",
                "problem",
                "issue",
                "damage",
                "broken",
                "leak")) {

            priority = "MEDIUM";
        }

        else {

            priority = "LOW";
        }

        // =================================================
        // SAVE AI CLASSIFICATION
        // =================================================

        complaint.setAiCategory(category);
        complaint.setAiPriority(priority);
        complaint.setAiConfidence(confidence);

        complaint.setDepartment(department);

        complaint.setAiVerified(true);

        complaint.setCategory(category);
        complaint.setPriority(priority);

        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint updated = complaintRepository.save(complaint);

        // =================================================
        // RESPONSE
        // =================================================

        AIClassificationResponse response =
                new AIClassificationResponse();

        response.setComplaintNumber(
                updated.getComplaintNumber()
        );

        response.setCategory(
                updated.getAiCategory()
        );

        response.setPriority(
                updated.getAiPriority()
        );

        response.setDepartment(
                updated.getDepartment()
        );

        response.setConfidence(
                updated.getAiConfidence()
        );

        response.setExplanation(
                "Complaint automatically classified based on its subject and description."
        );

        return response;
    }

    // =====================================================
    // OFFICER - GET ALL ASSIGNED COMPLAINTS
    // =====================================================

    @Override
    public List<ComplaintResponse> getOfficerComplaints(
            String officerId) {

        validateOfficerId(officerId);

        return complaintRepository
                .findByAssignedOfficer(officerId.trim())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // OFFICER - GET BY STATUS
    // =====================================================

    @Override
    public List<ComplaintResponse> getOfficerComplaintsByStatus(
            String officerId,
            String status) {

        validateOfficerId(officerId);
        validateStatus(status);

        return complaintRepository
                .findByAssignedOfficerAndStatus(
                        officerId.trim(),
                        status.trim().toUpperCase()
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // OFFICER - GET SINGLE COMPLAINT
    // =====================================================

    @Override
    public ComplaintResponse getOfficerComplaint(
            String officerId,
            String complaintNumber) {

        validateOfficerId(officerId);

        Complaint complaint = findComplaint(complaintNumber);

        if (complaint.getAssignedOfficer() == null ||
                !officerId.trim().equals(
                        complaint.getAssignedOfficer().trim()
                )) {

            throw new RuntimeException(
                    "This complaint is not assigned to you."
            );
        }

        return convertToResponse(complaint);
    }

    // =====================================================
    // OFFICER - UPDATE STATUS
    // =====================================================

    @Override
    public ComplaintResponse updateOfficerComplaintStatus(
            String officerId,
            String complaintNumber,
            String status) {

        validateOfficerId(officerId);
        validateStatus(status);

        Complaint complaint = findComplaint(complaintNumber);

        if (complaint.getAssignedOfficer() == null ||
                !officerId.trim().equals(
                        complaint.getAssignedOfficer().trim()
                )) {

            throw new RuntimeException(
                    "You can update only your assigned complaints."
            );
        }

        String newStatus = status.trim().toUpperCase();

        complaint.setStatus(newStatus);
        complaint.setUpdatedAt(LocalDateTime.now());

        if ("RESOLVED".equals(newStatus)) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        else if ("REOPENED".equals(newStatus)) {
            complaint.setResolvedAt(null);
        }

        Complaint updated = complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // OFFICER - ADD REMARKS
    // =====================================================

    @Override
    public ComplaintResponse addOfficerComplaintRemarks(
            String officerId,
            String complaintNumber,
            String remarks) {

        validateOfficerId(officerId);
        validateRemarks(remarks);

        Complaint complaint = findComplaint(complaintNumber);

        if (complaint.getAssignedOfficer() == null ||
                !officerId.trim().equals(
                        complaint.getAssignedOfficer().trim()
                )) {

            throw new RuntimeException(
                    "You can add remarks only to your assigned complaints."
            );
        }

        complaint.setOfficerRemarks(remarks.trim());
        complaint.setUpdatedAt(LocalDateTime.now());

        Complaint updated = complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // DEPARTMENT - GET ALL COMPLAINTS
    // =====================================================

    @Override
    public List<ComplaintResponse> getDepartmentComplaints(
            String department) {

        String normalizedDepartment =
                normalizeDepartment(department);

        return complaintRepository
                .findByDepartment(normalizedDepartment)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // DEPARTMENT - GET BY STATUS
    // =====================================================

    @Override
    public List<ComplaintResponse> getDepartmentComplaintsByStatus(
            String department,
            String status) {

        String normalizedDepartment =
                normalizeDepartment(department);

        validateStatus(status);

        return complaintRepository
                .findByDepartmentAndStatus(
                        normalizedDepartment,
                        status.trim().toUpperCase()
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // DEPARTMENT - GET SINGLE COMPLAINT
    // =====================================================

    @Override
    public ComplaintResponse getDepartmentComplaint(
            String department,
            String complaintNumber) {

        String normalizedDepartment =
                normalizeDepartment(department);

        Complaint complaint =
                findComplaint(complaintNumber);

        if (complaint.getDepartment() == null ||
                !normalizedDepartment.equalsIgnoreCase(
                        complaint.getDepartment().trim()
                )) {

            throw new RuntimeException(
                    "This complaint does not belong to your department."
            );
        }

        return convertToResponse(complaint);
    }

    // =====================================================
    // DEPARTMENT - UPDATE STATUS
    // =====================================================

    @Override
    public ComplaintResponse updateDepartmentComplaintStatus(
            String department,
            String complaintNumber,
            String status) {

        String normalizedDepartment =
                normalizeDepartment(department);

        validateStatus(status);

        Complaint complaint =
                findComplaint(complaintNumber);

        if (complaint.getDepartment() == null ||
                !normalizedDepartment.equalsIgnoreCase(
                        complaint.getDepartment().trim()
                )) {

            throw new RuntimeException(
                    "You can update only your department complaints."
            );
        }

        String newStatus =
                status.trim().toUpperCase();

        complaint.setStatus(newStatus);
        complaint.setUpdatedAt(LocalDateTime.now());

        if ("RESOLVED".equals(newStatus)) {
            complaint.setResolvedAt(LocalDateTime.now());
        }

        else if ("REOPENED".equals(newStatus)) {
            complaint.setResolvedAt(null);
        }

        Complaint updated =
                complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // DEPARTMENT - ADD REMARKS
    // =====================================================

    @Override
    public ComplaintResponse addDepartmentComplaintRemarks(
            String department,
            String complaintNumber,
            String remarks) {

        String normalizedDepartment =
                normalizeDepartment(department);

        validateRemarks(remarks);

        Complaint complaint =
                findComplaint(complaintNumber);

        if (complaint.getDepartment() == null ||
                !normalizedDepartment.equalsIgnoreCase(
                        complaint.getDepartment().trim()
                )) {

            throw new RuntimeException(
                    "You can add remarks only to your department complaints."
            );
        }

        complaint.setOfficerRemarks(
                remarks.trim()
        );

        complaint.setUpdatedAt(
                LocalDateTime.now()
        );

        Complaint updated =
                complaintRepository.save(complaint);

        return convertToResponse(updated);
    }

    // =====================================================
    // GENERAL OFFICER DASHBOARD
    // =====================================================

    @Override
    public OfficerDashboardResponse getOfficerDashboard(
            String officerId) {

        validateOfficerId(officerId);

        OfficerDashboardResponse response =
                new OfficerDashboardResponse();

        response.setSuccess(true);

        response.setMessage(
                "Officer dashboard loaded successfully."
        );

        response.setOfficerId(officerId);

        long total =
                complaintRepository.countByAssignedOfficer(
                        officerId.trim()
                );

        long assigned =
                complaintRepository.countByAssignedOfficerAndStatus(
                        officerId.trim(),
                        "ASSIGNED"
                );

        long inProgress =
                complaintRepository.countByAssignedOfficerAndStatus(
                        officerId.trim(),
                        "IN_PROGRESS"
                );

        long resolved =
                complaintRepository.countByAssignedOfficerAndStatus(
                        officerId.trim(),
                        "RESOLVED"
                );

        long submitted =
                complaintRepository.countByAssignedOfficerAndStatus(
                        officerId.trim(),
                        "SUBMITTED"
                );

        response.setTotalComplaints(total);
        response.setPendingComplaints(submitted);
        response.setSubmittedComplaints(submitted);
        response.setAssignedComplaints(assigned);
        response.setInProgressComplaints(inProgress);
        response.setResolvedComplaints(resolved);

        return response;
    }

    // =====================================================
    // DEPARTMENT DASHBOARD
    // =====================================================

    @Override
    public OfficerDashboardResponse getDepartmentDashboard(
            String department) {

        String normalizedDepartment =
                normalizeDepartment(department);

        OfficerDashboardResponse response =
                new OfficerDashboardResponse();

        response.setSuccess(true);

        response.setMessage(
                "Department dashboard loaded successfully."
        );

        response.setOfficerId(normalizedDepartment);

        long total =
                complaintRepository.countByDepartment(
                        normalizedDepartment
                );

        long assigned =
                complaintRepository.countByDepartmentAndStatus(
                        normalizedDepartment,
                        "ASSIGNED"
                );

        long inProgress =
                complaintRepository.countByDepartmentAndStatus(
                        normalizedDepartment,
                        "IN_PROGRESS"
                );

        long resolved =
                complaintRepository.countByDepartmentAndStatus(
                        normalizedDepartment,
                        "RESOLVED"
                );

        long submitted =
                complaintRepository.countByDepartmentAndStatus(
                        normalizedDepartment,
                        "SUBMITTED"
                );

        response.setTotalComplaints(total);
        response.setPendingComplaints(submitted);
        response.setSubmittedComplaints(submitted);
        response.setAssignedComplaints(assigned);
        response.setInProgressComplaints(inProgress);
        response.setResolvedComplaints(resolved);

        return response;
    }

    // =====================================================
    // FIND COMPLAINT
    // =====================================================

    private Complaint findComplaint(String complaintNumber) {

        if (complaintNumber == null ||
                complaintNumber.isBlank()) {

            throw new RuntimeException(
                    "Complaint number is required."
            );
        }

        return complaintRepository
                .findByComplaintNumber(
                        complaintNumber.trim()
                )
                .orElseThrow(
                        () -> new RuntimeException(
                                "Complaint not found: "
                                        + complaintNumber
                        )
                );
    }

    // =====================================================
    // VALIDATE OFFICER ID
    // =====================================================

    private void validateOfficerId(String officerId) {

        if (officerId == null ||
                officerId.isBlank()) {

            throw new RuntimeException(
                    "Officer ID is required."
            );
        }
    }

    // =====================================================
    // VALIDATE DEPARTMENT
    // =====================================================

    private void validateDepartment(String department) {

        if (department == null ||
                department.isBlank()) {

            throw new RuntimeException(
                    "Department is required."
            );
        }
    }

    // =====================================================
    // NORMALIZE DEPARTMENT
    // IMPORTANT:
    // WATER -> Water Department
    // WATER DEPARTMENT -> Water Department
    // =====================================================

    private String normalizeDepartment(String department) {

        validateDepartment(department);

        String value =
                department.trim()
                        .toUpperCase();

        switch (value) {

            case "WATER":
            case "WATER DEPARTMENT":
                return "Water Department";

            case "ELECTRICITY":
            case "ELECTRICITY DEPARTMENT":
                return "Electricity Department";

            case "ROAD":
            case "ROADS":
            case "ROAD DEPARTMENT":
            case "ROADS DEPARTMENT":
                return "Roads Department";

            case "SANITATION":
            case "SANITATION DEPARTMENT":
                return "Sanitation Department";

            case "HEALTH":
            case "HEALTH DEPARTMENT":
                return "Health Department";

            case "EDUCATION":
            case "EDUCATION DEPARTMENT":
                return "Education Department";

            case "AGRICULTURE":
            case "AGRICULTURE DEPARTMENT":
                return "Agriculture Department";

            case "REVENUE":
            case "REVENUE DEPARTMENT":
                return "Revenue Department";

            case "WOMEN_CHILD_WELFARE":
            case "WOMEN & CHILD WELFARE":
            case "WOMEN & CHILD WELFARE DEPARTMENT":
                return "Women & Child Welfare Department";

            default:
                return department.trim();
        }
    }

    // =====================================================
    // VALIDATE STATUS
    // =====================================================

    private void validateStatus(String status) {

        if (status == null ||
                status.isBlank()) {

            throw new RuntimeException(
                    "Complaint status is required."
            );
        }

        String value =
                status.trim().toUpperCase();

        if (!value.equals("ASSIGNED")
                && !value.equals("IN_PROGRESS")
                && !value.equals("RESOLVED")
                && !value.equals("REOPENED")
                && !value.equals("SUBMITTED")) {

            throw new RuntimeException(
                    "Invalid complaint status."
            );
        }
    }

    // =====================================================
    // VALIDATE REMARKS
    // =====================================================

    private void validateRemarks(String remarks) {

        if (remarks == null ||
                remarks.isBlank()) {

            throw new RuntimeException(
                    "Remarks cannot be empty."
            );
        }
    }

    // =====================================================
    // TEXT MATCH HELPER
    // =====================================================

    private boolean containsAny(
            String text,
            String... keywords) {

        if (text == null) {
            return false;
        }

        for (String keyword : keywords) {

            if (keyword != null &&
                    text.contains(keyword.toLowerCase())) {

                return true;
            }
        }

        return false;
    }

    // =====================================================
    // ENTITY -> RESPONSE
    // =====================================================

    private ComplaintResponse convertToResponse(
            Complaint complaint) {

        ComplaintResponse response =
                new ComplaintResponse();

        response.setId(
                complaint.getId()
        );

        response.setComplaintNumber(
                complaint.getComplaintNumber()
        );

        response.setVillageId(
                complaint.getVillageId()
        );

        response.setCitizenName(
                complaint.getCitizenName()
        );

        response.setMobile(
                complaint.getMobile()
        );

        response.setEmail(
                complaint.getEmail()
        );

        response.setSubject(
                complaint.getSubject()
        );

        response.setDescription(
                complaint.getDescription()
        );

        response.setLocation(
                complaint.getLocation()
        );

        response.setCategory(
                complaint.getCategory()
        );

        response.setPriority(
                complaint.getPriority()
        );

        response.setAiCategory(
                complaint.getAiCategory()
        );

        response.setAiPriority(
                complaint.getAiPriority()
        );

        response.setAiConfidence(
                complaint.getAiConfidence()
        );

        response.setDepartment(
                complaint.getDepartment()
        );

        response.setAiVerified(
                complaint.getAiVerified()
        );

        response.setStatus(
                complaint.getStatus()
        );

        response.setAssignedOfficer(
                complaint.getAssignedOfficer()
        );

        response.setOfficerRemarks(
                complaint.getOfficerRemarks()
        );

        response.setCreatedAt(
                complaint.getCreatedAt()
        );

        response.setUpdatedAt(
                complaint.getUpdatedAt()
        );

        response.setResolvedAt(
                complaint.getResolvedAt()
        );

        return response;
    }

    // =====================================================
    // GENERATE COMPLAINT NUMBER
    // =====================================================

    private String generateComplaintNumber() {

        return "CMP-" +
                System.currentTimeMillis();
    }
}