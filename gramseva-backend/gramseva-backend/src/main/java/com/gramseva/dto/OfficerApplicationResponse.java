package com.gramseva.dto;

import lombok.Data;

@Data
public class OfficerApplicationResponse {

    private Long id;

    private String applicationNumber;

    private String applicantName;

    private String childName;

    private String status;

    private String appliedDate;

}