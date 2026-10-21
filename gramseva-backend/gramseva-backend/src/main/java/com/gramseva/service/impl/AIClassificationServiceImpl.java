package com.gramseva.service.impl;

import com.gramseva.dto.AIClassificationResponse;
import com.gramseva.service.AIClassificationService;

import org.springframework.stereotype.Service;

@Service
public class AIClassificationServiceImpl
        implements AIClassificationService {

    @Override
    public AIClassificationResponse classifyComplaint(
            String subject,
            String description) {

        String text =
                (subject + " " + description).toLowerCase();

        AIClassificationResponse response =
                new AIClassificationResponse();

        // WATER
        if (text.contains("water")
                || text.contains("drinking water")
                || text.contains("water supply")) {

            response.setCategory("WATER_SUPPLY");
            response.setDepartment("WATER_DEPARTMENT");
            response.setPriority("HIGH");
            response.setConfidence(0.94);
            response.setExplanation(
                    "Complaint is related to water supply."
            );

        }

        // ROAD
        else if (text.contains("road")
                || text.contains("pothole")
                || text.contains("street")) {

            response.setCategory("ROAD");
            response.setDepartment("PUBLIC_WORKS");
            response.setPriority("MEDIUM");
            response.setConfidence(0.91);
            response.setExplanation(
                    "Complaint is related to road infrastructure."
            );

        }

        // ELECTRICITY
        else if (text.contains("electricity")
                || text.contains("power")
                || text.contains("electric")) {

            response.setCategory("ELECTRICITY");
            response.setDepartment("ELECTRICITY_DEPARTMENT");
            response.setPriority("HIGH");
            response.setConfidence(0.93);
            response.setExplanation(
                    "Complaint is related to electricity."
            );

        }

        // GARBAGE
        else if (text.contains("garbage")
                || text.contains("waste")
                || text.contains("cleaning")) {

            response.setCategory("SANITATION");
            response.setDepartment("SANITATION_DEPARTMENT");
            response.setPriority("MEDIUM");
            response.setConfidence(0.90);
            response.setExplanation(
                    "Complaint is related to sanitation."
            );

        }

        // DEFAULT
        else {

            response.setCategory("OTHER");
            response.setDepartment("GENERAL_ADMINISTRATION");
            response.setPriority("MEDIUM");
            response.setConfidence(0.60);
            response.setExplanation(
                    "Complaint could not be confidently classified."
            );
        }

        return response;
    }
}