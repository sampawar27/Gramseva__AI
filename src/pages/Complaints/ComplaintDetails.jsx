import "./ComplaintDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getComplaintById } from "../../api/complaintApi";


function ComplaintDetails() {

    const navigate = useNavigate();

    const { id } = useParams();


    // =====================================================
    // STATE
    // =====================================================

    const [complaint, setComplaint] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD COMPLAINT
    // =====================================================

    useEffect(() => {

        loadComplaint();

    }, [id]);


    const loadComplaint = async () => {

        try {

            setLoading(true);

            setError("");


            if (!id) {

                setError(
                    "Complaint ID is missing."
                );

                return;

            }


            const response =
                await getComplaintById(id);


            console.log(
                "Complaint Details:",
                response.data
            );


            setComplaint(
                response.data
            );


        } catch (err) {

            console.error(
                "Error loading complaint:",
                err
            );


            if (
                err.response?.status === 404
            ) {

                setError(
                    "Complaint not found."
                );

            } else {

                setError(
                    "Unable to load complaint details. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "RESOLVED":
                return "status-resolved";

            case "IN_PROGRESS":
                return "status-progress";

            case "REJECTED":
                return "status-rejected";

            case "SUBMITTED":
                return "status-submitted";

            default:
                return "status-submitted";

        }

    };


    // =====================================================
    // PRIORITY CLASS
    // =====================================================

    const getPriorityClass = (priority) => {

        switch (priority) {

            case "HIGH":
                return "priority-high";

            case "MEDIUM":
                return "priority-medium";

            case "LOW":
                return "priority-low";

            default:
                return "priority-medium";

        }

    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {

            return "N/A";

        }


        try {

            return new Date(
                date
            ).toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        } catch {

            return date;

        }

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="complaint-details-page">

                <div className="details-loading">

                    <div className="loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Loading Complaint...
                    </h2>

                    <p>
                        Please wait while we
                        fetch the complaint details.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="complaint-details-page">

                <div className="details-error">

                    <div className="error-icon">
                        ❌
                    </div>

                    <h2>
                        Unable to Load Complaint
                    </h2>

                    <p>
                        {error}
                    </p>


                    <div className="error-actions">

                        <button
                            onClick={loadComplaint}
                        >
                            🔄 Retry
                        </button>


                        <button
                            onClick={() =>
                                navigate(
                                    "/citizen/complaints"
                                )
                            }
                        >
                            ← Back to Complaints
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // NO COMPLAINT
    // =====================================================

    if (!complaint) {

        return (

            <div className="complaint-details-page">

                <div className="details-error">

                    <div className="error-icon">
                        📭
                    </div>

                    <h2>
                        Complaint Not Found
                    </h2>

                    <button
                        onClick={() =>
                            navigate(
                                "/citizen/complaints"
                            )
                        }
                    >
                        ← Back to Complaints
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // VALUES
    // =====================================================

    const priority =
        complaint.aiPriority ||
        complaint.priority ||
        "N/A";


    const category =
        complaint.aiCategory ||
        complaint.category ||
        "Pending";


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="complaint-details-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="complaint-details-header">

                <div>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/complaints"
                            )
                        }
                    >
                        ← Back to My Complaints
                    </button>


                    <h1>
                        🚨 Complaint Details
                    </h1>


                    <p>
                        View complete information
                        about your complaint.
                    </p>

                </div>


                <span
                    className={
                        `complaint-status ${getStatusClass(
                            complaint.status
                        )}`
                    }
                >
                    {complaint.status}
                </span>

            </div>



            {/* =================================================
                COMPLAINT NUMBER
            ================================================= */}

            <div className="complaint-number-card">

                <div>

                    <span>
                        Complaint Number
                    </span>

                    <h2>
                        {complaint.complaintNumber}
                    </h2>

                </div>


                <div>

                    <span>
                        Submitted On
                    </span>

                    <strong>
                        {
                            formatDate(
                                complaint.createdAt
                            )
                        }
                    </strong>

                </div>

            </div>



            {/* =================================================
                COMPLAINT INFORMATION
            ================================================= */}

            <div className="details-card">

                <div className="details-card-header">

                    <h2>
                        📋 Complaint Information
                    </h2>

                </div>


                <div className="details-grid">


                    <div className="detail-item">

                        <span>
                            Subject
                        </span>

                        <strong>
                            {complaint.subject}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Location
                        </span>

                        <strong>
                            📍 {complaint.location}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Category
                        </span>

                        <strong>
                            {complaint.category || "N/A"}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            AI Category
                        </span>

                        <strong>
                            🤖 {category}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Priority
                        </span>

                        <strong
                            className={
                                getPriorityClass(
                                    priority
                                )
                            }
                        >
                            ⚡ {priority}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Department
                        </span>

                        <strong>
                            🏛️{" "}
                            {
                                complaint.department ||
                                "Pending"
                            }
                        </strong>

                    </div>

                </div>

            </div>



            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="details-card">

                <div className="details-card-header">

                    <h2>
                        📝 Description
                    </h2>

                </div>


                <div className="description-box">

                    {complaint.description}

                </div>

            </div>



            {/* =================================================
                AI VERIFICATION
            ================================================= */}

            <div className="details-card ai-details-card">

                <div className="details-card-header">

                    <h2>
                        🤖 GramSeva AI Verification
                    </h2>

                </div>


                <div className="ai-verification-details">


                    <div className="ai-status">

                        <span className="ai-big-icon">
                            🤖
                        </span>


                        <div>

                            <strong>
                                AI Verification
                            </strong>

                            <p>

                                {complaint.aiVerified
                                    ? "Complaint has been verified by GramSeva AI."
                                    : "Complaint verification is pending."
                                }

                            </p>

                        </div>

                    </div>


                    {complaint.aiConfidence != null && (

                        <div className="confidence-box">

                            <span>
                                AI Confidence
                            </span>

                            <strong>
                                {
                                    (
                                        complaint.aiConfidence *
                                        100
                                    ).toFixed(0)
                                }%
                            </strong>

                        </div>

                    )}

                </div>

            </div>



            {/* =================================================
                OFFICER INFORMATION
            ================================================= */}

            <div className="details-card">

                <div className="details-card-header">

                    <h2>
                        👨‍💼 Officer Information
                    </h2>

                </div>


                <div className="details-grid">


                    <div className="detail-item">

                        <span>
                            Assigned Officer
                        </span>

                        <strong>
                            {
                                complaint.assignedOfficer ||
                                "Not Assigned"
                            }
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Last Updated
                        </span>

                        <strong>
                            {
                                formatDate(
                                    complaint.updatedAt
                                )
                            }
                        </strong>

                    </div>


                    {complaint.resolvedAt && (

                        <div className="detail-item">

                            <span>
                                Resolved On
                            </span>

                            <strong>
                                {
                                    formatDate(
                                        complaint.resolvedAt
                                    )
                                }
                            </strong>

                        </div>

                    )}

                </div>


                {complaint.officerRemarks && (

                    <div className="officer-remarks">

                        <span>
                            Officer Remarks
                        </span>

                        <p>
                            {
                                complaint.officerRemarks
                            }
                        </p>

                    </div>

                )}

            </div>



            {/* =================================================
                STATUS TIMELINE
            ================================================= */}

            <div className="details-card">

                <div className="details-card-header">

                    <h2>
                        📊 Complaint Status
                    </h2>

                </div>


                <div className="status-timeline">


                    <div
                        className={
                            complaint.status === "SUBMITTED" ||
                            complaint.status === "IN_PROGRESS" ||
                            complaint.status === "RESOLVED"
                                ? "timeline-item active"
                                : "timeline-item"
                        }
                    >

                        <div className="timeline-icon">
                            📤
                        </div>

                        <div>

                            <strong>
                                Submitted
                            </strong>

                            <p>
                                Complaint submitted
                                successfully.
                            </p>

                        </div>

                    </div>



                    <div
                        className={
                            complaint.status === "IN_PROGRESS" ||
                            complaint.status === "RESOLVED"
                                ? "timeline-item active"
                                : "timeline-item"
                        }
                    >

                        <div className="timeline-icon">
                            🔧
                        </div>

                        <div>

                            <strong>
                                In Progress
                            </strong>

                            <p>
                                Complaint is being
                                processed by the officer.
                            </p>

                        </div>

                    </div>



                    <div
                        className={
                            complaint.status === "RESOLVED"
                                ? "timeline-item active"
                                : "timeline-item"
                        }
                    >

                        <div className="timeline-icon">
                            ✅
                        </div>

                        <div>

                            <strong>
                                Resolved
                            </strong>

                            <p>
                                Complaint has been
                                resolved.
                            </p>

                        </div>

                    </div>

                </div>

            </div>



            {/* =================================================
                FOOTER ACTIONS
            ================================================= */}

            <div className="details-actions">

                <button
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >
                    ← Back to My Complaints
                </button>


                <button
                    onClick={() =>
                        navigate(
                            "/citizen/complaints/new"
                        )
                    }
                >
                    🚨 Report Another Problem
                </button>

            </div>

        </div>

    );

}


export default ComplaintDetails;