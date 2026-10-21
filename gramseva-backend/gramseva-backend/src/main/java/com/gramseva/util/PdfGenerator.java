package com.gramseva.util;

import com.gramseva.entity.BirthCertificate;
import com.gramseva.entity.IncomeCertificate;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;

import java.io.ByteArrayOutputStream;

public class PdfGenerator {


    // =========================================================
    // GENERATE BIRTH CERTIFICATE
    // =========================================================

    public static byte[] generateBirthCertificate(
            BirthCertificate certificate)
            throws Exception {

        Document document = new Document();

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();

        PdfWriter.getInstance(
                document,
                outputStream
        );

        document.open();


        Font titleFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        18,
                        Font.BOLD
                );


        Paragraph title =
                new Paragraph(
                        "Birth Certificate",
                        titleFont
                );

        title.setAlignment(
                Element.ALIGN_CENTER
        );

        document.add(title);

        document.add(
                new Paragraph(" ")
        );


        document.add(
                new Paragraph(
                        "Application Number : " +
                                certificate.getApplicationNumber()
                )
        );


        document.add(
                new Paragraph(
                        "Applicant Name : " +
                                certificate.getApplicantName()
                )
        );


        document.add(
                new Paragraph(
                        "Child Name : " +
                                certificate.getChildName()
                )
        );


        document.add(
                new Paragraph(
                        "Father Name : " +
                                certificate.getFatherName()
                )
        );


        document.add(
                new Paragraph(
                        "Mother Name : " +
                                certificate.getMotherName()
                )
        );


        document.add(
                new Paragraph(
                        "Date Of Birth : " +
                                certificate.getChildDob()
                )
        );


        document.add(
                new Paragraph(
                        "Gender : " +
                                certificate.getGender()
                )
        );


        document.add(
                new Paragraph(
                        "Place Of Birth : " +
                                certificate.getPlaceOfBirth()
                )
        );


        document.add(
                new Paragraph(
                        "Village : " +
                                certificate.getVillage()
                )
        );


        document.add(
                new Paragraph(
                        "Taluka : " +
                                certificate.getTaluka()
                )
        );


        document.add(
                new Paragraph(
                        "District : " +
                                certificate.getDistrict()
                )
        );


        document.add(
                new Paragraph(
                        "State : " +
                                certificate.getState()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        document.add(
                new Paragraph(
                        "Issued By Gram Panchayat"
                )
        );


        document.close();

        return outputStream.toByteArray();

    }


    // =========================================================
    // GENERATE INCOME CERTIFICATE
    // =========================================================

    public static byte[] generateIncomeCertificate(
            IncomeCertificate certificate)
            throws Exception {

        Document document = new Document();

        ByteArrayOutputStream outputStream =
                new ByteArrayOutputStream();


        PdfWriter.getInstance(
                document,
                outputStream
        );


        document.open();


        // =====================================================
        // TITLE
        // =====================================================

        Font titleFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        18,
                        Font.BOLD
                );


        Paragraph title =
                new Paragraph(
                        "Income Certificate",
                        titleFont
                );


        title.setAlignment(
                Element.ALIGN_CENTER
        );


        document.add(title);

        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // APPLICATION INFORMATION
        // =====================================================

        Font sectionFont =
                new Font(
                        Font.FontFamily.HELVETICA,
                        13,
                        Font.BOLD
                );


        document.add(
                new Paragraph(
                        "Application Information",
                        sectionFont
                )
        );


        document.add(
                new Paragraph(
                        "Application Number : " +
                                certificate.getApplicationNumber()
                )
        );


        document.add(
                new Paragraph(
                        "Status : " +
                                certificate.getStatus()
                )
        );


        document.add(
                new Paragraph(
                        "Applied Date : " +
                                certificate.getAppliedDate()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // PERSONAL INFORMATION
        // =====================================================

        document.add(
                new Paragraph(
                        "Personal Information",
                        sectionFont
                )
        );


        document.add(
                new Paragraph(
                        "Applicant Name : " +
                                certificate.getApplicantName()
                )
        );


        document.add(
                new Paragraph(
                        "Father Name : " +
                                certificate.getFatherName()
                )
        );


        document.add(
                new Paragraph(
                        "Date Of Birth : " +
                                certificate.getDateOfBirth()
                )
        );


        document.add(
                new Paragraph(
                        "Gender : " +
                                certificate.getGender()
                )
        );


        document.add(
                new Paragraph(
                        "Mobile : " +
                                certificate.getMobile()
                )
        );


        document.add(
                new Paragraph(
                        "Email : " +
                                certificate.getEmail()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // INCOME INFORMATION
        // =====================================================

        document.add(
                new Paragraph(
                        "Income Information",
                        sectionFont
                )
        );


        document.add(
                new Paragraph(
                        "Occupation : " +
                                certificate.getOccupation()
                )
        );


        document.add(
                new Paragraph(
                        "Annual Income : ₹" +
                                certificate.getAnnualIncome()
                )
        );


        document.add(
                new Paragraph(
                        "Income Source : " +
                                certificate.getIncomeSource()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // ADDRESS INFORMATION
        // =====================================================

        document.add(
                new Paragraph(
                        "Address Information",
                        sectionFont
                )
        );


        document.add(
                new Paragraph(
                        "Village : " +
                                certificate.getVillage()
                )
        );


        document.add(
                new Paragraph(
                        "Taluka : " +
                                certificate.getTaluka()
                )
        );


        document.add(
                new Paragraph(
                        "District : " +
                                certificate.getDistrict()
                )
        );


        document.add(
                new Paragraph(
                        "State : " +
                                certificate.getState()
                )
        );


        document.add(
                new Paragraph(
                        "Pincode : " +
                                certificate.getPincode()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // PURPOSE
        // =====================================================

        document.add(
                new Paragraph(
                        "Purpose",
                        sectionFont
                )
        );


        document.add(
                new Paragraph(
                        certificate.getPurpose()
                )
        );


        document.add(
                new Paragraph(" ")
        );


        // =====================================================
        // FOOTER
        // =====================================================

        document.add(
                new Paragraph(
                        "Issued By Gram Panchayat"
                )
        );


        document.close();


        return outputStream.toByteArray();

    }

}