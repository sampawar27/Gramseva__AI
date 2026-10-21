package com.gramseva.dto;

import lombok.Data;

@Data
public class BirthCertificateRequest {

    private String villageId;

    private String applicantName;

    private String childName;

    private String fatherName;

    private String motherName;

    private String childDob;

    private String gender;

    private String placeOfBirth;

    private String mobile;

    private String email;

    private String village;

    private String taluka;

    private String district;

    private String state;

    private String pincode;

    private String purpose;
}