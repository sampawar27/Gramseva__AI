package com.gramseva.ai;

import com.gramseva.entity.Complaint;
import org.springframework.stereotype.Service;

@Service
public class AIComplaintVerificationService {


    public Complaint verifyComplaint(
            Complaint complaint
    ) {

        String text =
                (
                        complaint.getSubject()
                                + " "
                                + complaint.getDescription()
                ).toLowerCase();


        String category = "OTHER";

        String department = "Gram Panchayat";

        String priority = "MEDIUM";


        // =====================================================
        // WATER
        // =====================================================

        if (
                text.contains("water")
                        || text.contains("pipeline")
                        || text.contains("tap")
                        || text.contains("पाणी")
        ) {

            category = "WATER";

            department = "Water Department";
        }


        // =====================================================
        // ROAD
        // =====================================================

        else if (
                text.contains("road")
                        || text.contains("pothole")
                        || text.contains("street")
                        || text.contains("रस्ता")
        ) {

            category = "ROAD";

            department = "Road Department";
        }


        // =====================================================
        // ELECTRICITY
        // =====================================================

        else if (
                text.contains("electricity")
                        || text.contains("electric")
                        || text.contains("power")
                        || text.contains("light")
                        || text.contains("वीज")
        ) {

            category = "ELECTRICITY";

            department = "Electricity Department";
        }


        // =====================================================
        // SANITATION
        // =====================================================

        else if (
                text.contains("garbage")
                        || text.contains("waste")
                        || text.contains("sanitation")
                        || text.contains("कचरा")
        ) {

            category = "SANITATION";

            department = "Sanitation Department";
        }


        // =====================================================
        // HIGH PRIORITY
        // =====================================================

        if (
                text.contains("emergency")
                        || text.contains("urgent")
                        || text.contains("danger")
                        || text.contains("accident")
        ) {

            priority = "HIGH";
        }


        complaint.setAiCategory(category);

        complaint.setAiPriority(priority);

        complaint.setDepartment(department);

        complaint.setAiConfidence(0.85);

        complaint.setAiVerified(true);


        return complaint;
    }
}