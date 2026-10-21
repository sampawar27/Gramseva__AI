package com.gramseva.service;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.BirthCertificateRequest;
import java.util.List;
import com.gramseva.dto.ApplicationResponse;
import com.gramseva.dto.OfficerApplicationResponse;
import com.gramseva.entity.BirthCertificate;

public interface BirthCertificateService {

    ApiResponse applyBirthCertificate(BirthCertificateRequest request);
    List<ApplicationResponse> getMyApplications(String villageId);
    List<OfficerApplicationResponse> getAllApplications();
    BirthCertificate getApplicationById(Long id);

    BirthCertificate approveApplication(Long id);

    BirthCertificate rejectApplication(Long id);
    byte[] downloadBirthCertificate(Long id) throws Exception;
}


