package com.gramseva.controller;

import com.gramseva.dto.ApiResponse;
import com.gramseva.dto.CreateDepartmentHeadRequest;
import com.gramseva.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/officer-setup")
@CrossOrigin(origins = "http://localhost:5173")
public class OfficerSetupController {

    @Autowired
    private UserService userService;


    @PostMapping(
            value = "/department-head",
            consumes = "application/json",
            produces = "application/json"
    )
    public ResponseEntity<ApiResponse> createDepartmentHead(
            @RequestBody CreateDepartmentHeadRequest request
    ) {

        if (request == null) {

            return ResponseEntity.badRequest().body(
                    new ApiResponse(
                            false,
                            "Request body is required."
                    )
            );
        }

        ApiResponse response =
                userService.createDepartmentHead(request);

        return ResponseEntity.ok(response);
    }
}