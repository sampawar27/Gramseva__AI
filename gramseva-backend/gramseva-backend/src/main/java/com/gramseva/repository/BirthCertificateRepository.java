package com.gramseva.repository;

import com.gramseva.entity.BirthCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BirthCertificateRepository
        extends JpaRepository<BirthCertificate, Long> {

    // Get all applications of a particular citizen
    List<BirthCertificate> findByVillageId(String villageId);

    // Get one application using application number
    Optional<BirthCertificate> findByApplicationNumber(
            String applicationNumber
    );

    // Get all applications for officer dashboard
    List<BirthCertificate> findAllByOrderByAppliedDateDesc();
}