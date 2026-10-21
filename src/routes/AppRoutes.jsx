
import React from "react";
import { Routes, Route } from "react-router-dom";

// ==================== Common Pages ====================
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NotFound from "../pages/NotFound/NotFound";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

// ==================== Citizen Pages ====================
import CitizenDashboard from "../pages/CitizenDashboard/CitizenDashboard";

import ApplyCertificate from "../pages/ApplyCertificate/ApplyCertificate";
import BirthCertificateForm from "../pages/ApplyCertificate/BirthCertificateForm";
import IncomeCertificateForm from "../pages/ApplyCertificate/IncomeCertificateForm";
import ResidenceCertificateForm from "../pages/ApplyCertificate/ResidenceCertificateForm";

import MyApplications from "../pages/MyApplications/MyApplications";
import ApplicationDetails from "../pages/MyApplications/ApplicationDetails";
import IncomeApplicationDetails from "../pages/MyApplications/IncomeApplicationDetails";

import Profile from "../pages/Profile/Profile";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

import Schemes from "../pages/Schemes/Schemes";
import SchemeDetails from "../pages/GovernmentSchemes/SchemeDetails";

import Complaints from "../pages/Complaints/Complaints";
import SubmitComplaint from "../pages/Complaints/SubmitComplaint";
import ComplaintDetails from "../pages/Complaints/ComplaintDetails";

// ==================== Officer Components ====================
// These are in src/components/
import OfficerLogin from "../components/OfficerLogin";
import OfficerDashboard from "../components/OfficerDashboard";
import OfficerComplaints from "../components/OfficerComplaints";
import OfficerApplications from "../components/OfficerApplications";
import OfficerApplicationDetails from "../components/OfficerApplicationDetails";

// ==================== Officer Pages ====================
import OfficerIncomeApplications from "../pages/OfficerIncomeApplications/OfficerIncomeApplications";
import OfficerIncomeApplicationDetails from "../pages/OfficerIncomeApplications/OfficerIncomeApplicationDetails";

// ==================== Admin ====================
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";

// ==================== Department Head ====================
import DepartmentHeadSetup from "../pages/DepartmentHeadSetup";

// ==================== Protected Route ====================
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import Chatbot from "../components/chatbot/Chatbot";

function AppRoutes() {
    return (
        <Routes>

            {/* =====================================================
                PUBLIC ROUTES
            ====================================================== */}

            {/* Home */}
            <Route
                path="/"
                element={<Home />}
            />

            {/* Citizen Login */}
            <Route
                path="/login"
                element={<Login />}
            />

            {/* Citizen Registration */}
            <Route
                path="/register"
                element={<Register />}
            />

            {/* Forgot Password */}
            <Route
                path="/forgot-password"
                element={<ForgotPassword />}
            />

            {/* Unauthorized */}
            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />


            {/* =====================================================
                OFFICER AUTHENTICATION
            ====================================================== */}

            {/* Officer Login
                Do NOT protect this route.
            */}
            <Route
                path="/officer/login"
                element={<OfficerLogin />}
            />

            {/* Department Head / Officer Account Setup */}
            <Route
                path="/department-head-setup"
                element={<DepartmentHeadSetup />}
            />
            
            <Route
    path="/ai-assistant"
    element={<Chatbot />}
/>

            {/* =====================================================
                CITIZEN DASHBOARD
            ====================================================== */}

            <Route
                path="/citizen/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <CitizenDashboard />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CITIZEN CERTIFICATE APPLICATIONS
            ====================================================== */}

            {/* Apply Certificate */}
            <Route
                path="/citizen/apply-certificate"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <ApplyCertificate />
                    </ProtectedRoute>
                }
            />

            {/* Birth Certificate */}
            <Route
                path="/citizen/apply-certificate/birth"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <BirthCertificateForm />
                    </ProtectedRoute>
                }
            />

            {/* Income Certificate */}
            <Route
                path="/citizen/apply-certificate/income"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <IncomeCertificateForm />
                    </ProtectedRoute>
                }
            />

            {/* Residence Certificate */}
            <Route
                path="/citizen/apply-certificate/residence"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <ResidenceCertificateForm />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CITIZEN APPLICATIONS
            ====================================================== */}

            {/* My Applications */}
            <Route
                path="/citizen/my-applications"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <MyApplications />
                    </ProtectedRoute>
                }
            />

            {/* Normal Application Details */}
            <Route
                path="/citizen/my-applications/:id"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <ApplicationDetails />
                    </ProtectedRoute>
                }
            />

            {/* Income Application Details */}
            <Route
                path="/citizen/my-applications/income/:id"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <IncomeApplicationDetails />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CITIZEN PROFILE
            ====================================================== */}

            <Route
                path="/citizen/profile"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            {/* Change Password */}
            <Route
                path="/citizen/change-password"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <ChangePassword />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CITIZEN GOVERNMENT SCHEMES
            ====================================================== */}

            <Route
                path="/citizen/schemes"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <Schemes />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/citizen/schemes/:id"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <SchemeDetails />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                CITIZEN COMPLAINTS
            ====================================================== */}

            {/* Complaints Home */}
            <Route
                path="/citizen/complaints"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <Complaints />
                    </ProtectedRoute>
                }
            />

            {/* Submit Complaint */}
            <Route
                path="/citizen/complaints/new"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <SubmitComplaint />
                    </ProtectedRoute>
                }
            />

            {/* Complaint Details */}
            <Route
                path="/citizen/complaints/:id"
                element={
                    <ProtectedRoute allowedRoles={["CITIZEN"]}>
                        <ComplaintDetails />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                OFFICER DASHBOARD
            ====================================================== */}

            {/* IMPORTANT:
                OfficerLogin stores authentication in:
                localStorage.officer
                localStorage.officerToken

                Therefore the existing ProtectedRoute
                (which checks localStorage.user) is NOT used here.
            */}

            <Route
                path="/officer/dashboard"
                element={<OfficerDashboard />}
            />


            {/* =====================================================
                OFFICER COMPLAINTS
            ====================================================== */}

            <Route
                path="/officer/complaints"
                element={<OfficerComplaints />}
            />


            {/* =====================================================
                OFFICER CERTIFICATE APPLICATIONS
            ====================================================== */}

            <Route
                path="/officer/applications"
                element={<OfficerApplications />}
            />

            <Route
                path="/officer/applications/:id"
                element={<OfficerApplicationDetails />}
            />


            {/* =====================================================
                OFFICER INCOME APPLICATIONS
            ====================================================== */}

            <Route
                path="/officer/income-applications"
                element={<OfficerIncomeApplications />}
            />

            <Route
                path="/officer/income-applications/:id"
                element={<OfficerIncomeApplicationDetails />}
            />


            {/* =====================================================
                ADMIN
            ====================================================== */}

            <Route
                path="/admin/dashboard"
                element={
                    <ProtectedRoute allowedRoles={["ADMIN"]}>
                        <AdminDashboard />
                    </ProtectedRoute>
                }
            />


            {/* =====================================================
                404 - NOT FOUND
            ====================================================== */}

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}

export default AppRoutes;

