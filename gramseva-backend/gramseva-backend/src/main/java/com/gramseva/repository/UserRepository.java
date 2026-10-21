package com.gramseva.repository;

import com.gramseva.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByAadhaarNumber(String aadhaarNumber);

    boolean existsByVillageId(String villageId);

    boolean existsByMobile(String mobile);

    boolean existsByEmail(String email);

    boolean existsByOfficerId(String officerId);

    Optional<User> findByVillageId(String villageId);

    Optional<User> findByOfficerId(String officerId);

    long count();
}