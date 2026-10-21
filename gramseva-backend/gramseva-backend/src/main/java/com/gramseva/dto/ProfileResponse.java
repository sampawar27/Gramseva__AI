package com.gramseva.dto;

import lombok.Data;

@Data
public class ProfileResponse {

    private Long id;

    private String villageId;

    private String fullName;

    private String email;

    private String mobile;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String role;

    private String status;

}