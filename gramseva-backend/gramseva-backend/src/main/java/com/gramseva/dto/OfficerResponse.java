package com.gramseva.dto;

import lombok.Data;

@Data
public class OfficerResponse {

    private boolean success;

    private String message;

    private Long id;

    private String officerId;

    private String fullName;

    private String email;

    private String mobile;

    private String role;

    private String status;

    private String department;

    private String token;
}