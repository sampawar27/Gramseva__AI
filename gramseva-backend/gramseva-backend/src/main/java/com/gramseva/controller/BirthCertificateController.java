package com.gramseva.controller;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.BirthCertificateRequest;
import com.gramseva.entity.BirthCertificate;
import com.gramseva.service.BirthCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.gramseva.dto.ApplicationResponse;
import java.util.List;
import com.gramseva.dto.OfficerApplicationResponse;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/birth-certificate")
@CrossOrigin(origins = "http://localhost:5173")
public class BirthCertificateController {

    @Autowired
    private BirthCertificateService birthCertificateService;

    @PostMapping("/apply")
    public ApiResponse applyCertificate(
            @RequestBody BirthCertificateRequest request) {

        return birthCertificateService.applyBirthCertificate(request);

    }

    @GetMapping("/my-applications/{villageId}")
    public List<ApplicationResponse> getMyApplications(
            @PathVariable String villageId) {

        return birthCertificateService.getMyApplications(villageId);

    }
    @GetMapping("/all")
    public List<OfficerApplicationResponse> getAllApplications() {

        return birthCertificateService.getAllApplications();

    }

    @GetMapping("/{id}")
    public BirthCertificate getApplicationById(
            @PathVariable Long id) {

        return birthCertificateService.getApplicationById(id);

    }

    @PutMapping("/approve/{id}")
    public BirthCertificate approveApplication(
            @PathVariable Long id) {

        return birthCertificateService.approveApplication(id);

    }

    @PutMapping("/reject/{id}")
    public BirthCertificate rejectApplication(
            @PathVariable Long id) {

        return birthCertificateService.rejectApplication(id);

    }
    @GetMapping("/download/{id}")
    public ResponseEntity<byte[]> downloadCertificate(
            @PathVariable Long id) throws Exception {

        byte[] pdf =
                birthCertificateService.downloadBirthCertificate(id);

        return ResponseEntity.ok()

                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=BirthCertificate.pdf")

                .contentType(MediaType.APPLICATION_PDF)

                .body(pdf);

    }
}
