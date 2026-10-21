import "./MyComplaints.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyComplaints } from "../../api/complaintApi";


function MyComplaints() {

    const navigate = useNavigate();


    // =====================================================
    // GET LOGGED USER
    // =====================================================

    const user = JSON.parse(
        localStorage.getItem("user")
    );


    // =====================================================
    // STATE
    // =====================================================

    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD COMPLAINTS
    // =====================================================

    useEffect(() => {

        loadComplaints();

    }, []);


    // =====================================================
    // LOAD CITIZEN COMPLAINTS
    // =====================================================

    const loadComplaints = async () => {

        try {

            setLoading(true);

            setError("");


            const loggedUser = JSON.parse(
                localStorage.getItem("user")
            );


            if (!loggedUser?.villageId) {

                setError(
                    "Village ID not found. Please login again."
                );

                setLoading(false);

                return;

            }


            const response = await getMyComplaints(
                loggedUser.villageId
            );


            console.log(
                "My Complaints:",
                response.data
            );


            setComplaints(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );


        } catch (err) {

            console.error(
                "Error loading complaints:",
                err
            );


            setError(
                "Unable to load complaints. Please try again."
            );


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

            return new Date(date).toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        } catch {

            return "N/A";

        }

    };


    // =====================================================
    // TOTAL COUNTS
    // =====================================================

    const totalComplaints =
        complaints.length;


    const submittedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "SUBMITTED"
        ).length;


    const inProgressComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "IN_PROGRESS"
        ).length;


    const resolvedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "RESOLVED"
        ).length;


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="my-complaints-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="my-complaints-header">

                <div>

                    <button
                        className="back-dashboard-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/dashboard"
                            )
                        }
                    >
                        ← Back to Dashboard
                    </button>


                    <h1>
                        🚨 My Complaints
                    </h1>


                    <p>
                        View and track all your
                        submitted complaints.
                    </p>

                </div>


                <button
                    className="new-complaint-btn"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints/new"
                        )
                    }
                >
                    + Report New Problem
                </button>

            </div>



            {/* =================================================
                USER INFORMATION
            ================================================= */}

            <div className="complaint-user-info">

                <div>

                    <span>
                        Citizen
                    </span>

                    <strong>
                        {user?.fullName || "Citizen"}
                    </strong>

                </div>


                <div>

                    <span>
                        Village ID
                    </span>

                    <strong>
                        {user?.villageId || "N/A"}
                    </strong>

                </div>

            </div>



            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="complaint-summary">


                {/* TOTAL */}

                <div className="complaint-summary-card">

                    <div className="summary-card-icon">
                        📢
                    </div>

                    <div>

                        <span>
                            Total
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : totalComplaints}
                        </strong>

                    </div>

                </div>


                {/* SUBMITTED */}

                <div className="complaint-summary-card">

                    <div className="summary-card-icon">
                        📤
                    </div>

                    <div>

                        <span>
                            Submitted
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : submittedComplaints}
                        </strong>

                    </div>

                </div>


                {/* IN PROGRESS */}

                <div className="complaint-summary-card">

                    <div className="summary-card-icon">
                        🔧
                    </div>

                    <div>

                        <span>
                            In Progress
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : inProgressComplaints}
                        </strong>

                    </div>

                </div>


                {/* RESOLVED */}

                <div className="complaint-summary-card">

                    <div className="summary-card-icon">
                        ✅
                    </div>

                    <div>

                        <span>
                            Resolved
                        </span>

                        <strong>
                            {loading
                                ? "..."
                                : resolvedComplaints}
                        </strong>

                    </div>

                </div>

            </div>



            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="complaints-error">

                    <span>
                        ❌ {error}
                    </span>

                    <button
                        onClick={loadComplaints}
                    >
                        Retry
                    </button>

                </div>

            )}



            {/* =================================================
                LOADING
            ================================================= */}

            {loading && (

                <div className="complaints-loading">

                    <div className="loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Loading Complaints...
                    </h2>

                    <p>
                        Please wait while we
                        fetch your complaints.
                    </p>

                </div>

            )}



            {/* =================================================
                EMPTY
            ================================================= */}

            {!loading &&
                !error &&
                complaints.length === 0 && (

                <div className="no-complaints">

                    <div className="no-complaints-icon">
                        📭
                    </div>

                    <h2>
                        No Complaints Yet
                    </h2>

                    <p>
                        You haven't submitted
                        any complaints yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/citizen/complaints/new"
                            )
                        }
                    >
                        🚨 Report a Problem
                    </button>

                </div>

            )}



            {/* =================================================
                COMPLAINT LIST
            ================================================= */}

            {!loading &&
                !error &&
                complaints.length > 0 && (

                <div className="complaints-container">

                    {complaints.map((complaint) => (

                        <div
                            className="complaint-card"
                            key={
                                complaint.id ||
                                complaint.complaintNumber
                            }
                        >


                            {/* =================================
                                CARD HEADER
                            ================================= */}

                            <div className="complaint-card-header">

                                <div>

                                    <span className="complaint-number-label">
                                        Complaint Number
                                    </span>

                                    <h2>
                                        {
                                            complaint.complaintNumber ||
                                            "N/A"
                                        }
                                    </h2>

                                </div>


                                <span
                                    className={
                                        `complaint-status ${getStatusClass(
                                            complaint.status
                                        )}`
                                    }
                                >
                                    {
                                        complaint.status ||
                                        "SUBMITTED"
                                    }
                                </span>

                            </div>



                            {/* =================================
                                SUBJECT
                            ================================= */}

                            <div className="complaint-subject">

                                <h3>
                                    {
                                        complaint.subject ||
                                        "No Subject"
                                    }
                                </h3>

                                <p>
                                    {
                                        complaint.description ||
                                        "No description available."
                                    }
                                </p>

                            </div>



                            {/* =================================
                                DETAILS
                            ================================= */}

                            <div className="complaint-details-grid">


                                {/* CATEGORY */}

                                <div className="complaint-detail">

                                    <span>
                                        📂 Category
                                    </span>

                                    <strong>
                                        {
                                            complaint.category ||
                                            "N/A"
                                        }
                                    </strong>

                                </div>


                                {/* AI CATEGORY */}

                                <div className="complaint-detail">

                                    <span>
                                        🤖 AI Category
                                    </span>

                                    <strong>
                                        {
                                            complaint.aiCategory ||
                                            "Pending"
                                        }
                                    </strong>

                                </div>


                                {/* PRIORITY */}

                                <div className="complaint-detail">

                                    <span>
                                        ⚡ Priority
                                    </span>

                                    <strong
                                        className={
                                            getPriorityClass(
                                                complaint.aiPriority ||
                                                complaint.priority
                                            )
                                        }
                                    >
                                        {
                                            complaint.aiPriority ||
                                            complaint.priority ||
                                            "N/A"
                                        }
                                    </strong>

                                </div>


                                {/* DEPARTMENT */}

                                <div className="complaint-detail">

                                    <span>
                                        🏛️ Department
                                    </span>

                                    <strong>
                                        {
                                            complaint.department ||
                                            "Pending"
                                        }
                                    </strong>

                                </div>


                                {/* LOCATION */}

                                <div className="complaint-detail">

                                    <span>
                                        📍 Location
                                    </span>

                                    <strong>
                                        {
                                            complaint.location ||
                                            "N/A"
                                        }
                                    </strong>

                                </div>


                                {/* SUBMITTED DATE */}

                                <div className="complaint-detail">

                                    <span>
                                        📅 Submitted
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



                            {/* =================================
                                AI VERIFICATION
                            ================================= */}

                            <div className="ai-verification">

                                <div>

                                    <span className="ai-icon">
                                        🤖
                                    </span>

                                    <div>

                                        <strong>
                                            GramSeva AI
                                        </strong>

                                        <p>

                                            {
                                                complaint.aiVerified
                                                    ? "Complaint verified successfully"
                                                    : "AI verification pending"
                                            }

                                        </p>

                                    </div>

                                </div>


                                {complaint.aiConfidence != null && (

                                    <span className="confidence">

                                        Confidence:{" "}

                                        {
                                            (
                                                complaint.aiConfidence *
                                                100
                                            ).toFixed(0)
                                        }%

                                    </span>

                                )}

                            </div>



                            {/* =================================
                                CARD FOOTER
                            ================================= */}

                            <div className="complaint-card-footer">

                                <span>

                                    Last Updated:{" "}

                                    {
                                        formatDate(
                                            complaint.updatedAt
                                        )
                                    }

                                </span>


                                <button
                                    className="view-complaint-btn"
                                    onClick={() =>
                                        navigate(
                                            `/citizen/complaints/${complaint.id}`
                                        )
                                    }
                                >
                                    👁 View Details →
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}


export default MyComplaints;