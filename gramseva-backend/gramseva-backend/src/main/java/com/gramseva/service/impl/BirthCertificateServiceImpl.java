package com.gramseva.service.impl;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.BirthCertificateRequest;
import com.gramseva.entity.BirthCertificate;
import com.gramseva.repository.BirthCertificateRepository;
import com.gramseva.service.BirthCertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import com.gramseva.dto.ApplicationResponse;
import java.util.ArrayList;
import java.util.List;
import com.gramseva.dto.OfficerApplicationResponse;
import java.util.ArrayList;
import java.util.List;

import com.gramseva.util.PdfGenerator;

@Service
public class BirthCertificateServiceImpl implements BirthCertificateService {

    @Autowired
    private BirthCertificateRepository birthCertificateRepository;

    @Override
    public ApiResponse applyBirthCertificate(BirthCertificateRequest request) {

        BirthCertificate certificate = new BirthCertificate();

        certificate.setApplicationNumber(generateApplicationNumber());

        certificate.setVillageId(request.getVillageId());

        certificate.setApplicantName(request.getApplicantName());

        certificate.setChildName(request.getChildName());

        certificate.setFatherName(request.getFatherName());

        certificate.setMotherName(request.getMotherName());

        certificate.setChildDob(LocalDate.parse(request.getChildDob()));

        certificate.setGender(request.getGender());

        certificate.setPlaceOfBirth(request.getPlaceOfBirth());

        certificate.setMobile(request.getMobile());

        certificate.setEmail(request.getEmail());

        certificate.setVillage(request.getVillage());

        certificate.setTaluka(request.getTaluka());

        certificate.setDistrict(request.getDistrict());

        certificate.setState(request.getState());

        certificate.setPincode(request.getPincode());

        certificate.setPurpose(request.getPurpose());

        certificate.setStatus("PENDING");

        certificate.setAppliedDate(LocalDateTime.now());

        birthCertificateRepository.save(certificate);

        return new ApiResponse(
                true,
                "Birth Certificate Application Submitted Successfully.\nApplication Number : "
                        + certificate.getApplicationNumber()
        );

    }

    @Override
    public List<ApplicationResponse> getMyApplications(String villageId) {

        List<BirthCertificate> certificates =
                birthCertificateRepository.findByVillageId(villageId);

        List<ApplicationResponse> responseList =
                new ArrayList<>();

        for (BirthCertificate certificate : certificates) {

            ApplicationResponse response =
                    new ApplicationResponse();

            response.setId(
                    certificate.getId()
            );

            response.setApplicationNumber(
                    certificate.getApplicationNumber()
            );

            response.setCertificateType(
                    "Birth Certificate"
            );

            response.setStatus(
                    certificate.getStatus()
            );

            response.setAppliedDate(
                    certificate.getAppliedDate()
                            .toLocalDate()
                            .toString()
            );

            responseList.add(response);

        }

        return responseList;

    }

    @Override
    public List<OfficerApplicationResponse> getAllApplications() {

        List<BirthCertificate> certificates =
                birthCertificateRepository.findAllByOrderByAppliedDateDesc();

        List<OfficerApplicationResponse> responseList = new ArrayList<>();

        for (BirthCertificate certificate : certificates) {

            OfficerApplicationResponse response =
                    new OfficerApplicationResponse();

            response.setId(certificate.getId());

            response.setApplicationNumber(
                    certificate.getApplicationNumber());

            response.setApplicantName(
                    certificate.getApplicantName());

            response.setChildName(
                    certificate.getChildName());

            response.setStatus(
                    certificate.getStatus());

            response.setAppliedDate(
                    certificate.getAppliedDate()
                            .toLocalDate()
                            .toString());

            responseList.add(response);

        }

        return responseList;

    }

    @Override
    public BirthCertificate getApplicationById(Long id) {

        return birthCertificateRepository
                .findById(id)
                .orElse(null);

    }
    @Override
    public BirthCertificate approveApplication(Long id) {

        BirthCertificate certificate =
                birthCertificateRepository.findById(id).orElse(null);

        if (certificate != null) {

            certificate.setStatus("APPROVED");

            birthCertificateRepository.save(certificate);

        }

        return certificate;

    }

    @Override
    public BirthCertificate rejectApplication(Long id) {

        BirthCertificate certificate =
                birthCertificateRepository.findById(id).orElse(null);

        if (certificate != null) {

            certificate.setStatus("REJECTED");

            birthCertificateRepository.save(certificate);

        }

        return certificate;

    }

    @Override
    public byte[] downloadBirthCertificate(Long id) throws Exception {

        BirthCertificate certificate =
                birthCertificateRepository.findById(id).orElse(null);

        if (certificate == null) {

            return null;

        }

        return PdfGenerator.generateBirthCertificate(certificate);

    }

    private String generateApplicationNumber() {

        long count = birthCertificateRepository.count() + 1;

        int year = Year.now().getValue();

        return String.format("BC%d%05d", year, count);

    }

}