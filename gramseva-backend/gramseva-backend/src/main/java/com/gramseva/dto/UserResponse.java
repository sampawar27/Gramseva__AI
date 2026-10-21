package com.gramseva.dto;

import lombok.Data;

@Data
public class UserResponse {

    private Long id;

    private String villageId;

    private String fullName;

    private String mobile;

    private String email;

    private String role;

    private String status;

    private String message;

    private boolean success;

    private String token;

}