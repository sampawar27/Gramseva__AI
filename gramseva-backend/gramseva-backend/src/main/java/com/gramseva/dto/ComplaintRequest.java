package com.gramseva.dto;

import lombok.Data;

@Data
public class ComplaintRequest {

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