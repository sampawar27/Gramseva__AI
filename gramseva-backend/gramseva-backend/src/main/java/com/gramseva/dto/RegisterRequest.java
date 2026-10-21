package com.gramseva.dto;

import lombok.Data;

@Data
public class RegisterRequest {

    private String aadhaarNumber;

    private String fullName;

    private String fatherName;

    private String dateOfBirth;

    private String gender;

    private String mobile;

    private String email;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String password;
}