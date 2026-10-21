package com.gramseva.repository;

import com.gramseva.entity.IncomeCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface IncomeCertificateRepository
        extends JpaRepository<IncomeCertificate, Long> {

    List<IncomeCertificate> findByVillageId(String villageId);

    Optional<IncomeCertificate> findByApplicationNumber(
            String applicationNumber
    );

    List<IncomeCertificate> findAllByOrderByAppliedDateDesc();

}