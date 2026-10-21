package com.gramseva.service;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.IncomeCertificateRequest;
import com.gramseva.dto.ApplicationResponse;
import com.gramseva.dto.OfficerApplicationResponse;
import com.gramseva.entity.IncomeCertificate;

import java.util.List;

public interface IncomeCertificateService {

    ApiResponse applyIncomeCertificate(
            IncomeCertificateRequest request
    );

    List<ApplicationResponse> getMyApplications(
            String villageId
    );

    List<OfficerApplicationResponse> getAllApplications();

    IncomeCertificate getApplicationById(
            Long id
    );

    IncomeCertificate approveApplication(
            Long id
    );

    IncomeCertificate rejectApplication(
            Long id
    );


    byte[] downloadIncomeCertificate(
            Long id
    ) throws Exception;
}