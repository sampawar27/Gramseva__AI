package com.gramseva.service;

import com.gramseva.dto.AIClassificationResponse;

public interface AIClassificationService {

    AIClassificationResponse classifyComplaint(
            String subject,
            String description
    );
}