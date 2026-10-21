package com.gramseva.service.impl;

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

import com.gramseva.entity.Role;
import com.gramseva.entity.Status;
import com.gramseva.entity.User;

import com.gramseva.repository.UserRepository;
import com.gramseva.security.JwtService;
import com.gramseva.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;


    // =====================================================
    // CHECK AADHAAR
    // =====================================================

    @Override
    public boolean existsByAadhaar(String aadhaarNumber) {

        if (aadhaarNumber == null || aadhaarNumber.isBlank()) {
            return false;
        }

        return userRepository.existsByAadhaarNumber(
                aadhaarNumber.trim()
        );
    }


    // =====================================================
    // REGISTER CITIZEN
    // =====================================================

    @Override
    public ApiResponse registerUser(RegisterRequest request) {

        if (request == null) {
            return new ApiResponse(
                    false,
                    "Registration data is required."
            );
        }


        // =================================================
        // AADHAAR VALIDATION
        // =================================================

        if (request.getAadhaarNumber() == null ||
                request.getAadhaarNumber().isBlank()) {

            return new ApiResponse(
                    false,
                    "Aadhaar number is required."
            );
        }

        String aadhaar = request.getAadhaarNumber().trim();

        if (!aadhaar.matches("\\d{12}")) {
            return new ApiResponse(
                    false,
                    "Aadhaar number must contain exactly 12 digits."
            );
        }

        if (userRepository.existsByAadhaarNumber(aadhaar)) {
            return new ApiResponse(
                    false,
                    "User already exists with this Aadhaar number."
            );
        }


        // =================================================
        // FULL NAME VALIDATION
        // =================================================

        if (request.getFullName() == null ||
                request.getFullName().isBlank()) {

            return new ApiResponse(
                    false,
                    "Full name is required."
            );
        }


        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (request.getMobile() == null ||
                request.getMobile().isBlank()) {

            return new ApiResponse(
                    false,
                    "Mobile number is required."
            );
        }

        String mobile = request.getMobile().trim();

        if (!mobile.matches("\\d{10}")) {
            return new ApiResponse(
                    false,
                    "Mobile number must contain exactly 10 digits."
            );
        }

        if (userRepository.existsByMobile(mobile)) {
            return new ApiResponse(
                    false,
                    "Mobile number is already registered."
            );
        }


        // =================================================
        // PASSWORD VALIDATION
        // =================================================

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new ApiResponse(
                    false,
                    "Password is required."
            );
        }

        if (request.getPassword().length() < 6) {
            return new ApiResponse(
                    false,
                    "Password must contain at least 6 characters."
            );
        }


        // =================================================
        // EMAIL VALIDATION
        // =================================================

        String email = request.getEmail() == null
                ? null
                : request.getEmail().trim();

        if (email != null &&
                !email.isBlank() &&
                userRepository.existsByEmail(email)) {

            return new ApiResponse(
                    false,
                    "Email is already registered."
            );
        }


        // =================================================
        // GENERATE VILLAGE ID
        // =================================================

        String villageId = generateVillageId();


        // =================================================
        // CREATE CITIZEN
        // =================================================

        User user = new User();

        user.setAadhaarNumber(aadhaar);
        user.setVillageId(villageId);

        user.setFullName(
                request.getFullName().trim()
        );

        user.setFatherName(
                request.getFatherName()
        );


        // =================================================
        // DATE OF BIRTH
        // =================================================

        if (request.getDateOfBirth() != null &&
                !request.getDateOfBirth().isBlank()) {

            try {

                user.setDateOfBirth(
                        LocalDate.parse(
                                request.getDateOfBirth()
                        )
                );

            } catch (Exception e) {

                return new ApiResponse(
                        false,
                        "Invalid date of birth."
                );
            }
        }


        user.setGender(
                request.getGender()
        );

        user.setMobile(mobile);

        user.setEmail(email);

        user.setVillage(
                request.getVillage()
        );

        user.setTaluka(
                request.getTaluka()
        );

        user.setDistrict(
                request.getDistrict()
        );

        user.setState(
                request.getState()
        );

        user.setPincode(
                request.getPincode()
        );


        // =================================================
        // PASSWORD
        // =================================================

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        // =================================================
        // ROLE AND STATUS
        // =================================================

        user.setRole(
                Role.CITIZEN
        );

        user.setStatus(
                Status.ACTIVE
        );

        user.setDepartment(null);

        user.setOfficerId(null);


        // =================================================
        // TIMESTAMPS
        // =================================================

        LocalDateTime now = LocalDateTime.now();

        user.setCreatedAt(now);
        user.setUpdatedAt(now);


        // =================================================
        // SAVE USER
        // =================================================

        User savedUser =
                userRepository.save(user);


        if (savedUser == null ||
                savedUser.getId() == null) {

            return new ApiResponse(
                    false,
                    "Registration failed. User was not saved."
            );
        }


        return new ApiResponse(
                true,
                "Registration successful! Your Village ID is "
                        + savedUser.getVillageId()
        );
    }


    // =====================================================
    // CREATE DEPARTMENT HEAD
    // =====================================================

    @Override
    public ApiResponse createDepartmentHead(
            CreateDepartmentHeadRequest request) {

        if (request == null) {
            return new ApiResponse(
                    false,
                    "Department head data is required."
            );
        }


        // =================================================
        // OFFICER ID
        // =================================================

        if (request.getOfficerId() == null ||
                request.getOfficerId().isBlank()) {

            return new ApiResponse(
                    false,
                    "Officer ID is required."
            );
        }

        String officerId =
                request.getOfficerId().trim();

        if (userRepository.existsByOfficerId(officerId)) {

            return new ApiResponse(
                    false,
                    "Officer ID already exists."
            );
        }


        // =================================================
        // FULL NAME
        // =================================================

        if (request.getFullName() == null ||
                request.getFullName().isBlank()) {

            return new ApiResponse(
                    false,
                    "Full name is required."
            );
        }


        // =================================================
        // MOBILE
        // =================================================

        if (request.getMobile() == null ||
                request.getMobile().isBlank()) {

            return new ApiResponse(
                    false,
                    "Mobile number is required."
            );
        }

        String mobile =
                request.getMobile().trim();

        if (!mobile.matches("\\d{10}")) {

            return new ApiResponse(
                    false,
                    "Mobile number must contain exactly 10 digits."
            );
        }

        if (userRepository.existsByMobile(mobile)) {

            return new ApiResponse(
                    false,
                    "Mobile number is already registered."
            );
        }


        // =================================================
        // EMAIL
        // =================================================

        String email =
                request.getEmail() == null
                        ? null
                        : request.getEmail().trim();

        if (email != null &&
                !email.isBlank() &&
                userRepository.existsByEmail(email)) {

            return new ApiResponse(
                    false,
                    "Email is already registered."
            );
        }


        // =================================================
        // DEPARTMENT
        // =================================================

        if (request.getDepartment() == null ||
                request.getDepartment().isBlank()) {

            return new ApiResponse(
                    false,
                    "Department is required."
            );
        }


        // =================================================
        // PASSWORD
        // =================================================

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            return new ApiResponse(
                    false,
                    "Password is required."
            );
        }

        if (request.getPassword().length() < 6) {

            return new ApiResponse(
                    false,
                    "Password must contain at least 6 characters."
            );
        }


        // =================================================
        // CREATE DEPARTMENT HEAD
        // =================================================

        User user = new User();

        user.setOfficerId(officerId);

        user.setFullName(
                request.getFullName().trim()
        );

        user.setMobile(mobile);

        user.setEmail(email);

        user.setDepartment(
                request.getDepartment().trim()
        );

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        // =================================================
        // ROLE
        // =================================================

        user.setRole(
                Role.OFFICER
        );

        user.setStatus(
                Status.ACTIVE
        );


        // Department head does not need citizen details
        user.setVillageId(null);
        user.setAadhaarNumber(null);


        // =================================================
        // TIMESTAMPS
        // =================================================

        LocalDateTime now =
                LocalDateTime.now();

        user.setCreatedAt(now);
        user.setUpdatedAt(now);


        // =================================================
        // SAVE
        // =================================================

        User savedUser =
                userRepository.save(user);

        if (savedUser == null ||
                savedUser.getId() == null) {

            return new ApiResponse(
                    false,
                    "Department head creation failed."
            );
        }


        return new ApiResponse(
                true,
                "Department head created successfully."
        );
    }


    // =====================================================
    // CITIZEN LOGIN
    // =====================================================

    @Override
    public UserResponse loginUser(
            LoginRequest request) {

        UserResponse response =
                new UserResponse();

        if (request == null) {

            response.setSuccess(false);
            response.setMessage(
                    "Login data is required."
            );

            return response;
        }

        if (request.getVillageId() == null ||
                request.getVillageId().isBlank()) {

            response.setSuccess(false);
            response.setMessage(
                    "Village ID is required."
            );

            return response;
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            response.setSuccess(false);
            response.setMessage(
                    "Password is required."
            );

            return response;
        }


        User user =
                userRepository
                        .findByVillageId(
                                request.getVillageId().trim()
                        )
                        .orElse(null);


        if (user == null) {

            response.setSuccess(false);
            response.setMessage(
                    "Village ID not found."
            );

            return response;
        }

        if (user.getRole() != Role.CITIZEN) {

            response.setSuccess(false);
            response.setMessage(
                    "This login is only for citizens."
            );

            return response;
        }

        if (user.getStatus() != Status.ACTIVE) {

            response.setSuccess(false);
            response.setMessage(
                    "Your account is not active."
            );

            return response;
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            response.setSuccess(false);
            response.setMessage(
                    "Incorrect password."
            );

            return response;
        }


        String token =
                jwtService.generateToken(
                        user.getVillageId(),
                        user.getRole().name()
                );


        response.setSuccess(true);
        response.setMessage(
                "Login Successful"
        );

        response.setId(user.getId());
        response.setVillageId(
                user.getVillageId()
        );

        response.setFullName(
                user.getFullName()
        );

        response.setMobile(
                user.getMobile()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setRole(
                user.getRole().name()
        );

        response.setStatus(
                user.getStatus().name()
        );

        response.setToken(token);

        return response;
    }


    // =====================================================
    // OFFICER LOGIN
    // =====================================================

    @Override
    public OfficerResponse loginOfficer(
            OfficerLoginRequest request) {

        OfficerResponse response =
                new OfficerResponse();


        if (request == null) {

            response.setSuccess(false);
            response.setMessage(
                    "Login data is required."
            );

            return response;
        }


        if (request.getOfficerId() == null ||
                request.getOfficerId().isBlank()) {

            response.setSuccess(false);
            response.setMessage(
                    "Officer ID is required."
            );

            return response;
        }


        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {

            response.setSuccess(false);
            response.setMessage(
                    "Password is required."
            );

            return response;
        }


        String officerId =
                request.getOfficerId().trim();


        User user =
                userRepository
                        .findByOfficerId(officerId)
                        .orElse(null);


        if (user == null) {

            response.setSuccess(false);
            response.setMessage(
                    "Invalid Officer ID or password."
            );

            return response;
        }


        if (user.getRole() != Role.OFFICER) {

            response.setSuccess(false);
            response.setMessage(
                    "You are not authorized as an officer."
            );

            return response;
        }


        if (user.getStatus() != Status.ACTIVE) {

            response.setSuccess(false);
            response.setMessage(
                    "Officer account is not active."
            );

            return response;
        }


        if (user.getDepartment() == null ||
                user.getDepartment().isBlank()) {

            response.setSuccess(false);
            response.setMessage(
                    "Officer department is not assigned."
            );

            return response;
        }


        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        )) {

            response.setSuccess(false);
            response.setMessage(
                    "Invalid Officer ID or password."
            );

            return response;
        }


        // =================================================
        // JWT TOKEN
        // =================================================

        String token =
                jwtService.generateToken(
                        user.getOfficerId(),
                        user.getRole().name()
                );


        // =================================================
        // RESPONSE
        // =================================================

        response.setSuccess(true);

        response.setMessage(
                "Officer Login Successful"
        );

        response.setId(user.getId());

        response.setOfficerId(
                user.getOfficerId()
        );

        response.setFullName(
                user.getFullName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setMobile(
                user.getMobile()
        );

        response.setRole(
                user.getRole().name()
        );

        response.setStatus(
                user.getStatus().name()
        );

        response.setDepartment(
                user.getDepartment()
        );

        response.setToken(token);

        return response;
    }


    // =====================================================
    // GET CITIZEN PROFILE
    // =====================================================

    @Override
    public ProfileResponse getProfile(
            String villageId) {

        User user =
                userRepository
                        .findByVillageId(villageId)
                        .orElse(null);


        if (user == null) {
            return null;
        }


        ProfileResponse response =
                new ProfileResponse();

        response.setId(user.getId());

        response.setVillageId(
                user.getVillageId()
        );

        response.setFullName(
                user.getFullName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setMobile(
                user.getMobile()
        );

        response.setVillage(
                user.getVillage()
        );

        response.setTaluka(
                user.getTaluka()
        );

        response.setDistrict(
                user.getDistrict()
        );

        response.setState(
                user.getState()
        );

        response.setPincode(
                user.getPincode()
        );

        response.setRole(
                user.getRole() == null
                        ? null
                        : user.getRole().name()
        );

        response.setStatus(
                user.getStatus() == null
                        ? null
                        : user.getStatus().name()
        );

        return response;
    }


    // =====================================================
    // UPDATE PROFILE
    // =====================================================

    @Override
    public ApiResponse updateProfile(
            String villageId,
            UpdateProfileRequest request) {

        if (request == null) {

            return new ApiResponse(
                    false,
                    "Profile data is required."
            );
        }


        User user =
                userRepository
                        .findByVillageId(villageId)
                        .orElse(null);


        if (user == null) {

            return new ApiResponse(
                    false,
                    "User not found."
            );
        }


        user.setMobile(
                request.getMobile()
        );

        user.setEmail(
                request.getEmail()
        );

        user.setVillage(
                request.getVillage()
        );

        user.setTaluka(
                request.getTaluka()
        );

        user.setDistrict(
                request.getDistrict()
        );

        user.setState(
                request.getState()
        );

        user.setPincode(
                request.getPincode()
        );

        user.setUpdatedAt(
                LocalDateTime.now()
        );


        userRepository.save(user);


        return new ApiResponse(
                true,
                "Profile Updated Successfully"
        );
    }


    // =====================================================
    // CHANGE PASSWORD
    // =====================================================

    @Override
    public ApiResponse changePassword(
            String villageId,
            ChangePasswordRequest request) {

        User user =
                userRepository
                        .findByVillageId(villageId)
                        .orElse(null);


        if (user == null) {

            return new ApiResponse(
                    false,
                    "User not found."
            );
        }


        if (request == null ||
                request.getCurrentPassword() == null ||
                request.getCurrentPassword().isBlank()) {

            return new ApiResponse(
                    false,
                    "Current password is required."
            );
        }


        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        )) {

            return new ApiResponse(
                    false,
                    "Current password is incorrect."
            );
        }


        if (request.getNewPassword() == null ||
                request.getNewPassword().isBlank()) {

            return new ApiResponse(
                    false,
                    "New password cannot be empty."
            );
        }


        if (request.getNewPassword().length() < 6) {

            return new ApiResponse(
                    false,
                    "New password must contain at least 6 characters."
            );
        }


        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        user.setUpdatedAt(
                LocalDateTime.now()
        );

        userRepository.save(user);


        return new ApiResponse(
                true,
                "Password Changed Successfully"
        );
    }


    // =====================================================
    // GENERATE UNIQUE VILLAGE ID
    // =====================================================

    private String generateVillageId() {

        String villageId;

        do {

            String randomPart =
                    UUID.randomUUID()
                            .toString()
                            .substring(0, 6)
                            .toUpperCase();

            villageId =
                    "GP" + randomPart;

        } while (
                userRepository.existsByVillageId(
                        villageId
                )
        );

        return villageId;
    }
}