package com.gramseva.dto;

import lombok.Data;

@Data
public class IncomeCertificateRequest {

    private String villageId;

    private String applicantName;

    private String fatherName;

    private String dateOfBirth;

    private String gender;

    private String mobile;

    private String email;

    private String occupation;

    private Double annualIncome;

    private String incomeSource;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String purpose;

}