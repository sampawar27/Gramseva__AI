package com.gramseva.controller;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.ChangePasswordRequest;
import com.gramseva.dto.LoginRequest;
import com.gramseva.dto.OfficerLoginRequest;
import com.gramseva.dto.OfficerResponse;
import com.gramseva.dto.ProfileResponse;
import com.gramseva.dto.RegisterRequest;
import com.gramseva.dto.UpdateProfileRequest;
import com.gramseva.dto.UserResponse;
import com.gramseva.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;


    // ==========================================
    // TEST ENDPOINT
    // ==========================================

    @GetMapping("/test")
    public String test() {

        return "UserController is working";
    }


    // ==========================================
    // CHECK AADHAAR
    // ==========================================

    @GetMapping("/check-aadhaar/{aadhaarNumber}")
    public Map<String, Boolean> checkAadhaar(
            @PathVariable String aadhaarNumber) {

        return Map.of(
                "exists",
                userService.existsByAadhaar(aadhaarNumber)
        );
    }


    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public ApiResponse registerUser(
            @RequestBody RegisterRequest request) {

        return userService.registerUser(request);
    }


    // ==========================================
    // CITIZEN LOGIN
    // ==========================================

    @PostMapping("/login")
    public UserResponse loginUser(
            @RequestBody LoginRequest request) {

        return userService.loginUser(request);
    }


    // ==========================================
    // OFFICER LOGIN
    // ==========================================

    @PostMapping("/officer-login")
    public OfficerResponse loginOfficer(
            @RequestBody OfficerLoginRequest request) {

        return userService.loginOfficer(request);
    }


    // ==========================================
    // GET PROFILE
    // ==========================================

    @GetMapping("/profile/{villageId}")
    public ProfileResponse getProfile(
            @PathVariable String villageId) {

        return userService.getProfile(villageId);
    }


    // ==========================================
    // UPDATE PROFILE
    // ==========================================

    @PutMapping("/profile/{villageId}")
    public ApiResponse updateProfile(
            @PathVariable String villageId,
            @RequestBody UpdateProfileRequest request) {

        return userService.updateProfile(
                villageId,
                request
        );
    }


    // ==========================================
    // CHANGE PASSWORD
    // ==========================================

    @PutMapping("/change-password/{villageId}")
    public ApiResponse changePassword(
            @PathVariable String villageId,
            @RequestBody ChangePasswordRequest request) {

        return userService.changePassword(
                villageId,
                request
        );
    }
}