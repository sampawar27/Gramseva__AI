package com.gramseva.service;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.ChangePasswordRequest;
import com.gramseva.dto.CreateDepartmentHeadRequest;
import com.gramseva.dto.LoginRequest;
import com.gramseva.dto.OfficerLoginRequest;
import com.gramseva.dto.OfficerResponse;
import com.gramseva.dto.ProfileResponse;
import com.gramseva.dto.RegisterRequest;
import com.gramseva.dto.UpdateProfileRequest;
import com.gramseva.dto.UserResponse;

public interface UserService {

    boolean existsByAadhaar(String aadhaarNumber);


    // =====================================================
    // CITIZEN REGISTRATION
    // =====================================================

    ApiResponse registerUser(
            RegisterRequest request
    );


    // =====================================================
    // CITIZEN LOGIN
    // =====================================================

    UserResponse loginUser(
            LoginRequest request
    );


    // =====================================================
    // OFFICER LOGIN
    // =====================================================

    OfficerResponse loginOfficer(
            OfficerLoginRequest request
    );


    // =====================================================
    // CITIZEN PROFILE
    // =====================================================

    ProfileResponse getProfile(
            String villageId
    );


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    ApiResponse updateProfile(
            String villageId,
            UpdateProfileRequest request
    );


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    ApiResponse changePassword(
            String villageId,
            ChangePasswordRequest request
    );


    // =====================================================
    // CREATE DEPARTMENT HEAD
    // =====================================================

    ApiResponse createDepartmentHead(
            CreateDepartmentHeadRequest request
    );
}