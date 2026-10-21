package com.gramseva.dto;

import lombok.Data;

@Data
public class AIClassificationResponse {

    private String complaintNumber;

    private String category;

    private String priority;

    private String department;

    private Double confidence;

    private String explanation;
}