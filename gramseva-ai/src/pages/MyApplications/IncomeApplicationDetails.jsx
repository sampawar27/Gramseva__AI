import "./IncomeApplicationDetails.css";

import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import {
    getIncomeApplicationById
} from "../../api/api";


function IncomeApplicationDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        loadApplication();

    }, [id]);


    const loadApplication = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getIncomeApplicationById(id);


            setApplication(
                response.data
            );


        } catch (error) {

            console.log(
                "Error loading income application:",
                error
            );

            setError(
                "Unable to load Income Certificate application details."
            );

        } finally {

            setLoading(false);

        }

    };


    const getStatusClass = (status) => {

        if (status === "APPROVED") {

            return "status-approved";

        }

        if (status === "REJECTED") {

            return "status-rejected";

        }

        return "status-pending";

    };


    if (loading) {

        return (

            <div className="income-details-page">

                <div className="income-details-card">

                    <h2>
                        Loading application...
                    </h2>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="income-details-page">

                <div className="income-details-card">

                    <h2>
                        ❌ {error}
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    if (!application) {

        return (

            <div className="income-details-page">

                <div className="income-details-card">

                    <h2>
                        Application not found
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="income-details-page">

            <div className="income-details-card">


                {/* HEADER */}

                <div className="income-details-header">

                    <div>

                        <h1>
                            💰 Income Certificate
                        </h1>

                        <p>
                            Application Details
                        </p>

                    </div>


                    <span
                        className={`application-status ${getStatusClass(
                            application.status
                        )}`}
                    >
                        {application.status}
                    </span>

                </div>


                {/* APPLICATION INFORMATION */}

                <div className="details-section">

                    <h2>
                        📋 Application Information
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Application Number
                            </label>

                            <p>
                                {
                                    application.applicationNumber
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Certificate Type
                            </label>

                            <p>
                                Income Certificate
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Status
                            </label>

                            <p>
                                {
                                    application.status
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Applied Date
                            </label>

                            <p>
                                {
                                    application.appliedDate
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* PERSONAL INFORMATION */}

                <div className="details-section">

                    <h2>
                        👤 Personal Information
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Applicant Name
                            </label>

                            <p>
                                {
                                    application.applicantName
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Father Name
                            </label>

                            <p>
                                {
                                    application.fatherName
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Date of Birth
                            </label>

                            <p>
                                {
                                    application.dateOfBirth
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Gender
                            </label>

                            <p>
                                {
                                    application.gender
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Mobile
                            </label>

                            <p>
                                {
                                    application.mobile
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Email
                            </label>

                            <p>
                                {
                                    application.email ||
                                    "Not provided"
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* INCOME INFORMATION */}

                <div className="details-section">

                    <h2>
                        💰 Income Information
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Occupation
                            </label>

                            <p>
                                {
                                    application.occupation
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Annual Income
                            </label>

                            <p>
                                ₹{" "}
                                {
                                    application.annualIncome
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Income Source
                            </label>

                            <p>
                                {
                                    application.incomeSource
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* ADDRESS */}

                <div className="details-section">

                    <h2>
                        📍 Address Information
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Village
                            </label>

                            <p>
                                {
                                    application.village
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Taluka
                            </label>

                            <p>
                                {
                                    application.taluka
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                District
                            </label>

                            <p>
                                {
                                    application.district
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                State
                            </label>

                            <p>
                                {
                                    application.state
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Pincode
                            </label>

                            <p>
                                {
                                    application.pincode
                                }
                            </p>

                        </div>

                    </div>

                </div>


                {/* PURPOSE */}

                <div className="details-section">

                    <h2>
                        📝 Purpose
                    </h2>


                    <div className="purpose-box">

                        {
                            application.purpose
                        }

                    </div>

                </div>


                {/* STATUS */}

                {application.status ===
                    "APPROVED" && (

                    <div className="success-message">

                        <strong>
                            ✅ Application Approved
                        </strong>

                        <p>
                            Your Income Certificate
                            application has been
                            approved by the officer.
                        </p>

                    </div>

                )}


                {application.status ===
                    "REJECTED" && (

                    <div className="rejected-message">

                        <strong>
                            ❌ Application Rejected
                        </strong>

                        <p>
                            Your Income Certificate
                            application has been
                            rejected.
                        </p>

                    </div>

                )}


                {application.status ===
                    "PENDING" && (

                    <div className="pending-message">

                        <strong>
                            ⏳ Application Under Review
                        </strong>

                        <p>
                            Your Income Certificate
                            application is currently
                            being reviewed.
                        </p>

                    </div>

                )}


                {/* BACK */}

                <div className="details-actions">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>


            </div>

        </div>

    );

}


export default IncomeApplicationDetails;