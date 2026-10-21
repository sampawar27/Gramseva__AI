import "./OfficerApplicationDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getBirthCertificateById,
    approveApplication,
    rejectApplication
} from "../../api/api";


function OfficerApplicationDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] = useState(null);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");


    useEffect(() => {

        loadApplication();

    }, [id]);


    const loadApplication = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
          await getBirthCertificateById(id);

            setApplication(response.data);

        }
        catch (error) {

            console.log(error);

            setError(
                "Unable to load application details."
            );

        }
        finally {

            setLoading(false);

        }

    };


    const handleApprove = async () => {

        if (!window.confirm(
            "Are you sure you want to approve this application?"
        )) {

            return;

        }


        try {

            setActionLoading(true);

            await approveApplication(id);

            alert(
                "Application Approved Successfully"
            );

            await loadApplication();

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed to approve application."
            );

        }
        finally {

            setActionLoading(false);

        }

    };


    const handleReject = async () => {

        if (!window.confirm(
            "Are you sure you want to reject this application?"
        )) {

            return;

        }


        try {

            setActionLoading(true);

            await rejectApplication(id);

            alert(
                "Application Rejected Successfully"
            );

            await loadApplication();

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed to reject application."
            );

        }
        finally {

            setActionLoading(false);

        }

    };


    if (loading) {

        return (

            <div className="details-loading">

                <h2>Loading application...</h2>

            </div>

        );

    }


    if (error) {

        return (

            <div className="details-error">

                <h2>{error}</h2>

                <button
                    onClick={() =>
                        navigate("/officer/applications")
                    }
                >
                    Back to Applications
                </button>

            </div>

        );

    }


    if (!application) {

        return (

            <div className="details-error">

                <h2>Application not found.</h2>

                <button
                    onClick={() =>
                        navigate("/officer/applications")
                    }
                >
                    Back to Applications
                </button>

            </div>

        );

    }


    return (

        <div className="officer-details-container">

            <div className="officer-details-card">


                {/* HEADER */}

                <div className="details-header">

                    <div>

                        <h1>
                            📄 Birth Certificate Application
                        </h1>

                        <p>
                            Application No:
                            <strong>
                                {" "}
                                {application.applicationNumber}
                            </strong>
                        </p>

                    </div>


                    <span
                        className={
                            application.status === "APPROVED"
                                ? "status approved"
                                : application.status === "REJECTED"
                                ? "status rejected"
                                : "status pending"
                        }
                    >
                        {application.status}
                    </span>

                </div>


                {/* APPLICANT INFORMATION */}

                <div className="details-section">

                    <h2>👤 Applicant Information</h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Applicant Name
                            </label>

                            <p>
                                {application.applicantName || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Mobile Number
                            </label>

                            <p>
                                {application.mobile || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Email
                            </label>

                            <p>
                                {application.email || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Aadhaar Number
                            </label>

                            <p>
                                {application.aadhaarNumber || "-"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* CHILD INFORMATION */}

                <div className="details-section">

                    <h2>👶 Child Information</h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Child Name
                            </label>

                            <p>
                                {application.childName || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Date of Birth
                            </label>

                            <p>
                                {application.childDob || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Gender
                            </label>

                            <p>
                                {application.gender || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Place of Birth
                            </label>

                            <p>
                                {application.placeOfBirth || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Father's Name
                            </label>

                            <p>
                                {application.fatherName || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Mother's Name
                            </label>

                            <p>
                                {application.motherName || "-"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ADDRESS */}

                <div className="details-section">

                    <h2>📍 Address Information</h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Village
                            </label>

                            <p>
                                {application.village || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Taluka
                            </label>

                            <p>
                                {application.taluka || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                District
                            </label>

                            <p>
                                {application.district || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                State
                            </label>

                            <p>
                                {application.state || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Pincode
                            </label>

                            <p>
                                {application.pincode || "-"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* APPLICATION INFORMATION */}

                <div className="details-section">

                    <h2>📋 Application Information</h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Purpose
                            </label>

                            <p>
                                {application.purpose || "-"}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Applied Date
                            </label>

                            <p>
                                {application.appliedDate
                                    ? String(application.appliedDate)
                                    : "-"
                                }
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Village ID
                            </label>

                            <p>
                                {application.villageId || "-"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ACTION BUTTONS */}

                <div className="details-actions">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/officer/applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>


                    {application.status === "PENDING" && (

                        <div className="decision-buttons">

                            <button
                                className="approve-details-btn"
                                onClick={handleApprove}
                                disabled={actionLoading}
                            >
                                {actionLoading
                                    ? "Processing..."
                                    : "✓ Approve"
                                }
                            </button>


                            <button
                                className="reject-details-btn"
                                onClick={handleReject}
                                disabled={actionLoading}
                            >
                                {actionLoading
                                    ? "Processing..."
                                    : "✕ Reject"
                                }
                            </button>

                        </div>

                    )}


                    {application.status === "APPROVED" && (

                        <div className="final-message approved-message">

                            ✓ This application has already been approved.

                        </div>

                    )}


                    {application.status === "REJECTED" && (

                        <div className="final-message rejected-message">

                            ✕ This application has already been rejected.

                        </div>

                    )}

                </div>


            </div>

        </div>

    );

}


export default OfficerApplicationDetails;