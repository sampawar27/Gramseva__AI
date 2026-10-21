package com.gramseva.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {

    private String mobile;

    private String email;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

}