package com.gramseva.dto;

import lombok.Data;

@Data
public class ComplaintDTO {

    private String villageId;

    private String citizenName;

    private String mobile;

    private String email;

    private String subject;

    private String description;

    private String location;

    private String category;

    private String priority;
}