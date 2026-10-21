package com.gramseva.controller;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.ApplicationResponse;
import com.gramseva.dto.IncomeCertificateRequest;
import com.gramseva.dto.OfficerApplicationResponse;
import com.gramseva.entity.IncomeCertificate;
import com.gramseva.service.IncomeCertificateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/income-certificate")
@CrossOrigin(origins = "http://localhost:5173")
public class IncomeCertificateController {

    @Autowired
    private IncomeCertificateService incomeCertificateService;


    // =========================================================
    // APPLY INCOME CERTIFICATE
    // =========================================================

    @PostMapping("/apply")
    public ApiResponse applyCertificate(
            @RequestBody IncomeCertificateRequest request) {

        return incomeCertificateService
                .applyIncomeCertificate(request);

    }


    // =========================================================
    // GET CITIZEN APPLICATIONS
    // =========================================================

    @GetMapping("/my-applications/{villageId}")
    public List<ApplicationResponse> getMyApplications(
            @PathVariable String villageId) {

        return incomeCertificateService
                .getMyApplications(villageId);

    }


    // =========================================================
    // GET ALL APPLICATIONS FOR OFFICER
    // =========================================================

    @GetMapping("/all")
    public List<OfficerApplicationResponse> getAllApplications() {

        return incomeCertificateService
                .getAllApplications();

    }


    // =========================================================
    // GET APPLICATION BY ID
    // =========================================================

    @GetMapping("/{id}")
    public IncomeCertificate getApplicationById(
            @PathVariable Long id) {

        return incomeCertificateService
                .getApplicationById(id);

    }


    // =========================================================
    // APPROVE APPLICATION
    // =========================================================

    @PutMapping("/approve/{id}")
    public IncomeCertificate approveApplication(
            @PathVariable Long id) {

        return incomeCertificateService
                .approveApplication(id);

    }


    // =========================================================
    // REJECT APPLICATION
    // =========================================================

    @PutMapping("/reject/{id}")
    public IncomeCertificate rejectApplication(
            @PathVariable Long id) {

        return incomeCertificateService
                .rejectApplication(id);

    }

}