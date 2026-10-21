package com.gramseva.dto;

import lombok.Data;

@Data
public class LoginRequest {

    private String villageId;
    private String password;

}