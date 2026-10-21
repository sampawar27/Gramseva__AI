package com.gramseva.dto;

import lombok.Data;

@Data
public class OfficerLoginRequest {

    private String officerId;

    private String password;
}