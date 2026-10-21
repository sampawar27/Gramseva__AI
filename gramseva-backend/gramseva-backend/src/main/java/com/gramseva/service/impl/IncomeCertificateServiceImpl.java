package com.gramseva.service.impl;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.ApplicationResponse;
import com.gramseva.dto.IncomeCertificateRequest;
import com.gramseva.dto.OfficerApplicationResponse;
import com.gramseva.entity.IncomeCertificate;
import com.gramseva.repository.IncomeCertificateRepository;
import com.gramseva.service.IncomeCertificateService;
import com.gramseva.util.PdfGenerator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;

@Service
public class IncomeCertificateServiceImpl
        implements IncomeCertificateService {

    @Autowired
    private IncomeCertificateRepository incomeCertificateRepository;


    // =========================================================
    // APPLY INCOME CERTIFICATE
    // =========================================================

    @Override
    public ApiResponse applyIncomeCertificate(
            IncomeCertificateRequest request) {

        IncomeCertificate certificate =
                new IncomeCertificate();


        certificate.setApplicationNumber(
                generateApplicationNumber()
        );


        certificate.setVillageId(
                request.getVillageId()
        );


        certificate.setApplicantName(
                request.getApplicantName()
        );


        certificate.setFatherName(
                request.getFatherName()
        );


        certificate.setDateOfBirth(
                LocalDate.parse(
                        request.getDateOfBirth()
                )
        );


        certificate.setGender(
                request.getGender()
        );


        certificate.setMobile(
                request.getMobile()
        );


        certificate.setEmail(
                request.getEmail()
        );


        certificate.setOccupation(
                request.getOccupation()
        );


        certificate.setAnnualIncome(
                request.getAnnualIncome()
        );


        certificate.setIncomeSource(
                request.getIncomeSource()
        );


        certificate.setVillage(
                request.getVillage()
        );


        certificate.setTaluka(
                request.getTaluka()
        );


        certificate.setDistrict(
                request.getDistrict()
        );


        certificate.setState(
                request.getState()
        );


        certificate.setPincode(
                request.getPincode()
        );


        certificate.setPurpose(
                request.getPurpose()
        );


        certificate.setStatus(
                "PENDING"
        );


        certificate.setAppliedDate(
                LocalDateTime.now()
        );


        certificate.setUpdatedAt(
                LocalDateTime.now()
        );


        incomeCertificateRepository.save(
                certificate
        );


        return new ApiResponse(
                true,
                "Income Certificate Application Submitted Successfully.\n"
                        + "Application Number : "
                        + certificate.getApplicationNumber()
        );

    }


    // =========================================================
    // GET MY APPLICATIONS
    // =========================================================

    @Override
    public List<ApplicationResponse> getMyApplications(
            String villageId) {

        List<IncomeCertificate> certificates =
                incomeCertificateRepository
                        .findByVillageId(villageId);


        List<ApplicationResponse> responseList =
                new ArrayList<>();


        for (IncomeCertificate certificate :
                certificates) {

            ApplicationResponse response =
                    new ApplicationResponse();


            response.setId(
                    certificate.getId()
            );


            response.setApplicationNumber(
                    certificate.getApplicationNumber()
            );


            response.setCertificateType(
                    "Income Certificate"
            );


            response.setStatus(
                    certificate.getStatus()
            );


            response.setAppliedDate(
                    certificate.getAppliedDate()
                            .toLocalDate()
                            .toString()
            );


            responseList.add(
                    response
            );

        }


        return responseList;

    }


    // =========================================================
    // GET ALL APPLICATIONS
    // =========================================================

    @Override
    public List<OfficerApplicationResponse> getAllApplications() {

        List<IncomeCertificate> certificates =
                incomeCertificateRepository
                        .findAllByOrderByAppliedDateDesc();


        List<OfficerApplicationResponse> responseList =
                new ArrayList<>();


        for (IncomeCertificate certificate :
                certificates) {

            OfficerApplicationResponse response =
                    new OfficerApplicationResponse();


            response.setId(
                    certificate.getId()
            );


            response.setApplicationNumber(
                    certificate.getApplicationNumber()
            );


            response.setApplicantName(
                    certificate.getApplicantName()
            );


            /*
             * Income Certificate does not have
             * childName.
             *
             * We therefore use applicant name
             * as the display name for now.
             */

            response.setChildName(
                    certificate.getApplicantName()
            );


            response.setStatus(
                    certificate.getStatus()
            );


            response.setAppliedDate(
                    certificate.getAppliedDate()
                            .toLocalDate()
                            .toString()
            );


            responseList.add(
                    response
            );

        }


        return responseList;

    }


    // =========================================================
    // GET APPLICATION BY ID
    // =========================================================

    @Override
    public IncomeCertificate getApplicationById(
            Long id) {

        return incomeCertificateRepository
                .findById(id)
                .orElse(null);

    }


    // =========================================================
    // APPROVE APPLICATION
    // =========================================================

    @Override
    public IncomeCertificate approveApplication(
            Long id) {

        IncomeCertificate certificate =
                incomeCertificateRepository
                        .findById(id)
                        .orElse(null);


        if (certificate != null) {

            certificate.setStatus(
                    "APPROVED"
            );


            certificate.setUpdatedAt(
                    LocalDateTime.now()
            );


            incomeCertificateRepository.save(
                    certificate
            );

        }


        return certificate;

    }


    // =========================================================
    // REJECT APPLICATION
    // =========================================================

    @Override
    public IncomeCertificate rejectApplication(
            Long id) {

        IncomeCertificate certificate =
                incomeCertificateRepository
                        .findById(id)
                        .orElse(null);


        if (certificate != null) {

            certificate.setStatus(
                    "REJECTED"
            );


            certificate.setUpdatedAt(
                    LocalDateTime.now()
            );


            incomeCertificateRepository.save(
                    certificate
            );

        }


        return certificate;

    }


    // =========================================================
    // DOWNLOAD INCOME CERTIFICATE
    // =========================================================

    @Override
    public byte[] downloadIncomeCertificate(
            Long id) throws Exception {

        IncomeCertificate certificate =
                incomeCertificateRepository
                        .findById(id)
                        .orElse(null);


        if (certificate == null) {

            return null;

        }


        return PdfGenerator.generateIncomeCertificate(
                certificate
        );

    }


    // =========================================================
    // GENERATE APPLICATION NUMBER
    // =========================================================

    private String generateApplicationNumber() {

        long count =
                incomeCertificateRepository.count() + 1;


        int year =
                Year.now().getValue();


        return String.format(
                "IC%d%05d",
                year,
                count
        );

    }

}