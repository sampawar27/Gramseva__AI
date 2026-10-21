package com.gramseva.dto;

import lombok.Data;

@Data
public class ApplicationResponse {

    private Long id;

    private String applicationNumber;

    private String certificateType;

    private String status;

    private String appliedDate;

}