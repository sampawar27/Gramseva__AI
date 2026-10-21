package com.gramseva.dto;

import lombok.Data;

@Data
public class CreateDepartmentHeadRequest {

    private String officerId;

    private String password;

    private String fullName;

    private String email;

    private String mobile;

    private String department;
}