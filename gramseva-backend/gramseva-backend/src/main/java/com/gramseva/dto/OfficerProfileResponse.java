package com.gramseva.dto;

import lombok.Data;

@Data
public class OfficerProfileResponse {

    private Long id;

    private String officerId;

    private String fullName;

    private String fatherName;

    private String mobile;

    private String email;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String role;

    private String status;

    private String department;
}