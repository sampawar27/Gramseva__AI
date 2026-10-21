package com.gramseva.controller;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.LoginRequest;
import com.gramseva.dto.UserResponse;
import com.gramseva.dto.RegisterRequest;
import com.gramseva.dto.OfficerLoginRequest;
import com.gramseva.dto.OfficerResponse;
import com.gramseva.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(originPatterns = "*")
public class AuthController {

    @Autowired
    private UserService userService;


    // =====================================================
    // CITIZEN REGISTER
    // =====================================================

    @PostMapping("/register")
    public ApiResponse registerUser(
            @RequestBody RegisterRequest request
    ) {

        return userService.registerUser(request);
    }


    // =====================================================
    // CITIZEN LOGIN
    // =====================================================

    @PostMapping("/login")
    public UserResponse loginUser(
            @RequestBody LoginRequest request
    ) {

        return userService.loginUser(request);
    }


    // =====================================================
    // OFFICER LOGIN
    // =====================================================

    @PostMapping(
            value = "/officer-login",
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<OfficerResponse> loginOfficer(
            @RequestBody OfficerLoginRequest request
    ) {

        OfficerResponse response =
                userService.loginOfficer(request);

        return ResponseEntity.ok(response);
    }
}