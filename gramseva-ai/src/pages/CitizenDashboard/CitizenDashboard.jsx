import "./CitizenDashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyApplications } from "../../api/api";
import { getMyComplaints } from "../../api/complaintApi";


function CitizenDashboard() {

    const navigate = useNavigate();


    // =========================================================
    // USER
    // =========================================================

    const [user, setUser] = useState(null);


    // =========================================================
    // APPLICATION STATE
    // =========================================================

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);


    // =========================================================
    // COMPLAINT STATE
    // =========================================================

    const [complaints, setComplaints] = useState([]);

    const [complaintLoading, setComplaintLoading] =
        useState(true);


    // =========================================================
    // LOAD DASHBOARD DATA
    // =========================================================

    useEffect(() => {

        const storedUser =
            localStorage.getItem("user");

        if (storedUser) {

            try {

                setUser(
                    JSON.parse(storedUser)
                );

            } catch (error) {

                console.error(
                    "Invalid user data:",
                    error
                );

                localStorage.removeItem("user");

            }

        }

        loadApplications();

        loadComplaints();

    }, []);


    // =========================================================
    // LOAD CERTIFICATE APPLICATIONS
    // =========================================================

    const loadApplications = async () => {

        try {

            const storedUser =
                localStorage.getItem("user");


            if (!storedUser) {

                setLoading(false);

                return;

            }


            const loggedUser =
                JSON.parse(storedUser);


            if (!loggedUser?.villageId) {

                setLoading(false);

                return;

            }


            const response =
                await getMyApplications(
                    loggedUser.villageId
                );


            console.log(
                "Dashboard Applications:",
                response.data
            );


            setApplications(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );


        } catch (error) {

            console.error(
                "Error loading dashboard applications:",
                error
            );


            setApplications([]);


        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // LOAD COMPLAINTS
    // =========================================================

    const loadComplaints = async () => {

        try {

            const storedUser =
                localStorage.getItem("user");


            if (!storedUser) {

                setComplaintLoading(false);

                return;

            }


            const loggedUser =
                JSON.parse(storedUser);


            if (!loggedUser?.villageId) {

                setComplaintLoading(false);

                return;

            }


            const response =
                await getMyComplaints(
                    loggedUser.villageId
                );


            console.log(
                "Citizen Complaints:",
                response.data
            );


            setComplaints(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );


        } catch (error) {

            console.error(
                "Error loading complaints:",
                error
            );


            setComplaints([]);


        } finally {

            setComplaintLoading(false);

        }

    };


    // =========================================================
    // APPLICATION COUNTS
    // =========================================================

    const totalApplications =
        applications.length;


    const pendingApplications =
        applications.filter(
            (app) =>
                app.status === "PENDING"
        ).length;


    const approvedApplications =
        applications.filter(
            (app) =>
                app.status === "APPROVED"
        ).length;


    const rejectedApplications =
        applications.filter(
            (app) =>
                app.status === "REJECTED"
        ).length;


    // =========================================================
    // COMPLAINT COUNTS
    // =========================================================

    const totalComplaints =
        complaints.length;


    const submittedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "SUBMITTED"
        ).length;


    const aiVerifiedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.aiVerified === true ||
                complaint.status === "AI_VERIFIED"
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


    const rejectedComplaints =
        complaints.filter(
            (complaint) =>
                complaint.status === "REJECTED"
        ).length;


    // =========================================================
    // LATEST APPLICATION
    // =========================================================

    const latestApplication =
        applications.length > 0
            ? applications[0]
            : null;


    // =========================================================
    // LATEST COMPLAINT
    // =========================================================

    const latestComplaint =
        complaints.length > 0
            ? complaints[0]
            : null;


    // =========================================================
    // CERTIFICATE COUNTS
    // =========================================================

    const birthApplications =
        applications.filter(
            (app) =>
                app.certificateType ===
                "Birth Certificate"
        ).length;


    const incomeApplications =
        applications.filter(
            (app) =>
                app.certificateType ===
                "Income Certificate"
        ).length;


    const residenceApplications =
        applications.filter(
            (app) =>
                app.certificateType ===
                "Residence Certificate"
        ).length;


    // =========================================================
    // COMPLAINT STATUS CLASS
    // =========================================================

    const getComplaintStatusClass =
        (status) => {

            switch (status) {

                case "RESOLVED":
                    return "approved";

                case "REJECTED":
                    return "rejected";

                case "IN_PROGRESS":
                    return "pending";

                case "AI_VERIFIED":
                    return "pending";

                case "ASSIGNED":
                    return "pending";

                case "SUBMITTED":
                default:
                    return "pending";

            }

        };


    // =========================================================
    // COMPLAINT STATUS LABEL
    // =========================================================

    const getComplaintStatusLabel =
        (status) => {

            switch (status) {

                case "SUBMITTED":
                    return "📤 SUBMITTED";

                case "AI_VERIFIED":
                    return "🤖 AI VERIFIED";

                case "ASSIGNED":
                    return "👨‍💼 ASSIGNED";

                case "IN_PROGRESS":
                    return "🔧 IN PROGRESS";

                case "RESOLVED":
                    return "✅ RESOLVED";

                case "REJECTED":
                    return "❌ REJECTED";

                default:
                    return status || "UNKNOWN";

            }

        };


    // =========================================================
    // AI VERIFICATION LABEL
    // =========================================================

    const getAIStatus =
        (complaint) => {

            if (!complaint) {

                return "Not Available";

            }


            if (
                complaint.aiVerified === true ||
                complaint.status === "AI_VERIFIED"
            ) {

                return "🤖 Verified";

            }


            return "⏳ Pending";

        };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("user");

        localStorage.removeItem(
            "rememberVillageId"
        );

        navigate("/login");

    };


    // =========================================================
    // RETURN
    // =========================================================

    return (

        <div className="citizen-dashboard">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        👋 Welcome to GramSeva AI
                    </h1>

                    <p>
                        Access government services
                        quickly and easily.
                    </p>

                </div>


                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    🚪 Logout
                </button>

            </div>



            {/* =====================================================
                USER WELCOME
            ===================================================== */}

            <div className="user-welcome">

                <h2>

                    Hello,{" "}

                    {user?.fullName ||
                        user?.name ||
                        "Citizen"}

                    {" "}👋

                </h2>


                <p>

                    Village ID:{" "}

                    <strong>
                        {user?.villageId || "N/A"}
                    </strong>

                </p>

            </div>



            {/* =====================================================
                APPLICATION STATISTICS
            ===================================================== */}

            <div className="application-stats">


                {/* TOTAL APPLICATIONS */}

                <div
                    className="stat-card total-card"
                    onClick={() =>
                        navigate(
                            "/citizen/my-applications"
                        )
                    }
                >

                    <div className="stat-icon">
                        📄
                    </div>


                    <div>

                        <h3>
                            Total Applications
                        </h3>


                        <p>
                            {loading
                                ? "..."
                                : totalApplications}
                        </p>

                    </div>

                </div>



                {/* PENDING */}

                <div
                    className="stat-card pending-card"
                    onClick={() =>
                        navigate(
                            "/citizen/my-applications?status=PENDING"
                        )
                    }
                >

                    <div className="stat-icon">
                        ⏳
                    </div>


                    <div>

                        <h3>
                            Pending
                        </h3>


                        <p>
                            {loading
                                ? "..."
                                : pendingApplications}
                        </p>

                    </div>

                </div>



                {/* APPROVED */}

                <div
                    className="stat-card approved-card"
                    onClick={() =>
                        navigate(
                            "/citizen/my-applications?status=APPROVED"
                        )
                    }
                >

                    <div className="stat-icon">
                        ✅
                    </div>


                    <div>

                        <h3>
                            Approved
                        </h3>


                        <p>
                            {loading
                                ? "..."
                                : approvedApplications}
                        </p>

                    </div>

                </div>



                {/* REJECTED */}

                <div
                    className="stat-card rejected-card"
                    onClick={() =>
                        navigate(
                            "/citizen/my-applications?status=REJECTED"
                        )
                    }
                >

                    <div className="stat-icon">
                        ❌
                    </div>


                    <div>

                        <h3>
                            Rejected
                        </h3>


                        <p>
                            {loading
                                ? "..."
                                : rejectedApplications}
                        </p>

                    </div>

                </div>

            </div>



            {/* =====================================================
                COMPLAINT OVERVIEW
            ===================================================== */}

            <h2 className="section-title">
                🚨 Complaint Overview
            </h2>


            <div className="complaint-stats">


                {/* TOTAL COMPLAINTS */}

                <div
                    className="complaint-stat-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="complaint-stat-icon">
                        📢
                    </div>


                    <div>

                        <h3>
                            Total Complaints
                        </h3>


                        <p>
                            {complaintLoading
                                ? "..."
                                : totalComplaints}
                        </p>

                    </div>

                </div>



                {/* SUBMITTED */}

                <div
                    className="complaint-stat-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="complaint-stat-icon">
                        📤
                    </div>


                    <div>

                        <h3>
                            Submitted
                        </h3>


                        <p>
                            {complaintLoading
                                ? "..."
                                : submittedComplaints}
                        </p>

                    </div>

                </div>



                {/* AI VERIFIED */}

                <div
                    className="complaint-stat-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="complaint-stat-icon">
                        🤖
                    </div>


                    <div>

                        <h3>
                            AI Verified
                        </h3>


                        <p>
                            {complaintLoading
                                ? "..."
                                : aiVerifiedComplaints}
                        </p>

                    </div>

                </div>



                {/* IN PROGRESS */}

                <div
                    className="complaint-stat-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="complaint-stat-icon">
                        🔧
                    </div>


                    <div>

                        <h3>
                            In Progress
                        </h3>


                        <p>
                            {complaintLoading
                                ? "..."
                                : inProgressComplaints}
                        </p>

                    </div>

                </div>



                {/* RESOLVED */}

                <div
                    className="complaint-stat-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="complaint-stat-icon">
                        ✅
                    </div>


                    <div>

                        <h3>
                            Resolved
                        </h3>


                        <p>
                            {complaintLoading
                                ? "..."
                                : resolvedComplaints}
                        </p>

                    </div>

                </div>

            </div>



            {/* =====================================================
                QUICK ACTIONS
            ===================================================== */}

            <h2 className="section-title">
                ⚡ Quick Actions
            </h2>


            <div className="dashboard-cards">


                {/* APPLY CERTIFICATE */}

                <div
                    className="dashboard-card"
                    onClick={() =>
                        navigate(
                            "/citizen/apply-certificate"
                        )
                    }
                >

                    <div className="card-icon">
                        📋
                    </div>


                    <h2>
                        Apply Certificate
                    </h2>


                    <p>
                        Apply for Birth, Income and
                        Residence certificates.
                    </p>


                    <button>
                        Apply Now →
                    </button>

                </div>



                {/* MY APPLICATIONS */}

                <div
                    className="dashboard-card"
                    onClick={() =>
                        navigate(
                            "/citizen/my-applications"
                        )
                    }
                >

                    <div className="card-icon">
                        📄
                    </div>


                    <h2>
                        My Applications
                    </h2>


                    <p>
                        Track your submitted
                        certificate applications
                        and status.
                    </p>


                    <button>
                        View Applications →
                    </button>

                </div>



                {/* PROFILE */}

                <div
                    className="dashboard-card"
                    onClick={() =>
                        navigate(
                            "/citizen/profile"
                        )
                    }
                >

                    <div className="card-icon">
                        👤
                    </div>


                    <h2>
                        My Profile
                    </h2>


                    <p>
                        View and update your personal
                        information.
                    </p>


                    <button>
                        View Profile →
                    </button>

                </div>



                {/* SECURITY */}

                <div
                    className="dashboard-card"
                    onClick={() =>
                        navigate(
                            "/citizen/change-password"
                        )
                    }
                >

                    <div className="card-icon">
                        🔐
                    </div>


                    <h2>
                        Security
                    </h2>


                    <p>
                        Change your account password
                        and keep your account secure.
                    </p>


                    <button>
                        Change Password →
                    </button>

                </div>



                {/* GOVERNMENT SCHEMES */}

                <div
                    className="dashboard-card"
                    onClick={() =>
                        navigate(
                            "/citizen/schemes"
                        )
                    }
                >

                    <div className="card-icon">
                        🏛️
                    </div>


                    <h2>
                        Government Schemes
                    </h2>


                    <p>
                        Explore government schemes,
                        benefits, eligibility and
                        required documents.
                    </p>


                    <button>
                        View Schemes →
                    </button>

                </div>



                {/* MY COMPLAINTS */}

                <div
                    className="dashboard-card complaint-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints"
                        )
                    }
                >

                    <div className="card-icon">
                        🚨
                    </div>


                    <h2>
                        My Complaints
                    </h2>


                    <p>
                        View submitted complaints
                        and track their resolution.
                    </p>


                    <button>
                        View Complaints →
                    </button>

                </div>



                {/* REPORT PROBLEM */}

                <div
                    className="dashboard-card complaint-card"
                    onClick={() =>
                        navigate(
                            "/citizen/complaints/new"
                        )
                    }
                >

                    <div className="card-icon">
                        📝
                    </div>


                    <h2>
                        Report a Problem
                    </h2>


                    <p>
                        Report issues related to
                        water, roads, electricity,
                        sanitation and more.
                    </p>


                    <button>
                        Submit Complaint →
                    </button>

                </div>

            </div>



            {/* =====================================================
                LATEST APPLICATION
            ===================================================== */}

            {latestApplication && (

                <div className="latest-application">

                    <div className="latest-header">

                        <div>

                            <h2>
                                🕐 Latest Application
                            </h2>


                            <p>
                                Your most recently submitted
                                certificate application
                            </p>

                        </div>


                        <span
                            className={
                                latestApplication.status ===
                                "APPROVED"
                                    ? "latest-status approved"
                                    : latestApplication.status ===
                                      "REJECTED"
                                    ? "latest-status rejected"
                                    : "latest-status pending"
                            }
                        >

                            {
                                latestApplication.status ===
                                "APPROVED"
                                    ? "✅ APPROVED"
                                    : latestApplication.status ===
                                      "REJECTED"
                                    ? "❌ REJECTED"
                                    : "⏳ PENDING"
                            }

                        </span>

                    </div>



                    <div className="latest-content">

                        <div className="latest-info">

                            <span>
                                Application Number
                            </span>


                            <strong>
                                {
                                    latestApplication.applicationNumber
                                }
                            </strong>

                        </div>


                        <div className="latest-info">

                            <span>
                                Certificate
                            </span>


                            <strong>
                                {
                                    latestApplication.certificateType
                                }
                            </strong>

                        </div>


                        <div className="latest-info">

                            <span>
                                Applied Date
                            </span>


                            <strong>
                                {
                                    latestApplication.appliedDate
                                }
                            </strong>

                        </div>

                    </div>



                    <button
                        className="latest-view-btn"
                        onClick={() => {

                            if (
                                latestApplication.id
                            ) {

                                navigate(
                                    `/citizen/my-applications/${latestApplication.id}`
                                );

                            }

                        }}
                    >
                        👁 View Application →
                    </button>

                </div>

            )}



            {/* =====================================================
                LATEST COMPLAINT
            ===================================================== */}

            {latestComplaint && (

                <div className="latest-application">

                    <div className="latest-header">

                        <div>

                            <h2>
                                🚨 Latest Complaint
                            </h2>


                            <p>
                                Your most recently submitted
                                complaint
                            </p>

                        </div>


                        <span
                            className={
                                `latest-status ${
                                    getComplaintStatusClass(
                                        latestComplaint.status
                                    )
                                }`
                            }
                        >

                            {
                                getComplaintStatusLabel(
                                    latestComplaint.status
                                )
                            }

                        </span>

                    </div>



                    <div className="latest-content">

                        <div className="latest-info">

                            <span>
                                Complaint Number
                            </span>


                            <strong>
                                {
                                    latestComplaint.complaintNumber ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="latest-info">

                            <span>
                                Subject
                            </span>


                            <strong>
                                {
                                    latestComplaint.subject ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="latest-info">

                            <span>
                                AI Category
                            </span>


                            <strong>
                                {
                                    latestComplaint.aiCategory ||
                                    latestComplaint.category ||
                                    "Pending"
                                }
                            </strong>

                        </div>


                        <div className="latest-info">

                            <span>
                                AI Verification
                            </span>


                            <strong>
                                {
                                    getAIStatus(
                                        latestComplaint
                                    )
                                }
                            </strong>

                        </div>

                    </div>



                    <button
                        className="latest-view-btn"
                        onClick={() => {

                            if (
                                latestComplaint.id
                            ) {

                                navigate(
                                    `/citizen/complaints/${latestComplaint.id}`
                                );

                            }

                        }}
                    >
                        👁 View Complaint →
                    </button>

                </div>

            )}



            {/* =====================================================
                NO COMPLAINT MESSAGE
            ===================================================== */}

            {!complaintLoading &&
                complaints.length === 0 && (

                    <div className="empty-applications">

                        <div className="empty-icon">
                            📢
                        </div>


                        <h3>
                            No Complaints Yet
                        </h3>


                        <p>
                            Have a problem in your village?
                            Report it to GramSeva.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/citizen/complaints/new"
                                )
                            }
                        >
                            📝 Report a Problem →
                        </button>

                    </div>

                )}



            {/* =====================================================
                CERTIFICATE SUMMARY
            ===================================================== */}

            <div className="certificate-summary">

                <div className="summary-header">

                    <div>

                        <h2>
                            📊 Certificate Summary
                        </h2>


                        <p>
                            Applications submitted by
                            certificate type
                        </p>

                    </div>

                </div>



                <div className="certificate-summary-grid">


                    {/* BIRTH */}

                    <div
                        className="certificate-summary-card"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications?certificate=BIRTH"
                            )
                        }
                    >

                        <div className="summary-icon birth-icon">
                            🍼
                        </div>


                        <div>

                            <h3>
                                Birth Certificate
                            </h3>


                            <strong>
                                {birthApplications}
                            </strong>


                            <span>
                                Applications
                            </span>

                        </div>

                    </div>



                    {/* INCOME */}

                    <div
                        className="certificate-summary-card"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications?certificate=INCOME"
                            )
                        }
                    >

                        <div className="summary-icon income-icon">
                            💰
                        </div>


                        <div>

                            <h3>
                                Income Certificate
                            </h3>


                            <strong>
                                {incomeApplications}
                            </strong>


                            <span>
                                Applications
                            </span>

                        </div>

                    </div>



                    {/* RESIDENCE */}

                    <div
                        className="certificate-summary-card"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications?certificate=RESIDENCE"
                            )
                        }
                    >

                        <div className="summary-icon residence-icon">
                            🏠
                        </div>


                        <div>

                            <h3>
                                Residence Certificate
                            </h3>


                            <strong>
                                {residenceApplications}
                            </strong>


                            <span>
                                Applications
                            </span>

                        </div>

                    </div>

                </div>

            </div>



            {/* =====================================================
                RECENT APPLICATIONS
            ===================================================== */}

            <div className="recent-section">

                <div className="recent-header">

                    <h2>
                        📑 Recent Applications
                    </h2>


                    <button
                        className="view-all-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        View All →
                    </button>

                </div>



                {loading ? (

                    <div className="empty-applications">

                        <p>
                            Loading applications...
                        </p>

                    </div>

                ) : applications.length === 0 ? (

                    <div className="empty-applications">

                        <div className="empty-icon">
                            📭
                        </div>


                        <h3>
                            No Applications Yet
                        </h3>


                        <p>
                            You haven't submitted
                            any certificate applications.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/citizen/apply-certificate"
                                )
                            }
                        >
                            Apply Certificate →
                        </button>

                    </div>

                ) : (

                    <div className="recent-table-wrapper">

                        <table className="recent-table">

                            <thead>

                                <tr>

                                    <th>
                                        Application No
                                    </th>

                                    <th>
                                        Certificate
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Applied Date
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {applications
                                    .slice(0, 5)
                                    .map(
                                        (app) => (

                                            <tr
                                                key={
                                                    app.id ||
                                                    app.applicationNumber
                                                }
                                                className="clickable-row"
                                                onClick={() => {

                                                    if (
                                                        app.id
                                                    ) {

                                                        navigate(
                                                            `/citizen/my-applications/${app.id}`
                                                        );

                                                    }

                                                }}
                                            >

                                                <td>
                                                    {
                                                        app.applicationNumber
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        app.certificateType
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            app.status ===
                                                            "APPROVED"
                                                                ? "approved"
                                                                : app.status ===
                                                                  "REJECTED"
                                                                ? "rejected"
                                                                : "pending"
                                                        }
                                                    >
                                                        {
                                                            app.status
                                                        }
                                                    </span>

                                                </td>


                                                <td>
                                                    {
                                                        app.appliedDate
                                                    }
                                                </td>


                                                <td>

                                                    <button
                                                        className="recent-view-btn"
                                                        onClick={(
                                                            event
                                                        ) => {

                                                            event.stopPropagation();


                                                            if (
                                                                app.id
                                                            ) {

                                                                navigate(
                                                                    `/citizen/my-applications/${app.id}`
                                                                );

                                                            }

                                                        }}
                                                    >
                                                        👁 View
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>



            {/* =====================================================
                RECENT COMPLAINTS
            ===================================================== */}

            <div className="recent-section">

                <div className="recent-header">

                    <h2>
                        🚨 Recent Complaints
                    </h2>


                    <button
                        className="view-all-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/complaints"
                            )
                        }
                    >
                        View All →
                    </button>

                </div>



                {complaintLoading ? (

                    <div className="empty-applications">

                        <p>
                            Loading complaints...
                        </p>

                    </div>

                ) : complaints.length === 0 ? (

                    <div className="empty-applications">

                        <div className="empty-icon">
                            📢
                        </div>


                        <h3>
                            No Complaints Yet
                        </h3>


                        <p>
                            You have not submitted
                            any complaints.
                        </p>


                        <button
                            onClick={() =>
                                navigate(
                                    "/citizen/complaints/new"
                                )
                            }
                        >
                            Report a Problem →
                        </button>

                    </div>

                ) : (

                    <div className="recent-table-wrapper">

                        <table className="recent-table">

                            <thead>

                                <tr>

                                    <th>
                                        Complaint No
                                    </th>

                                    <th>
                                        Subject
                                    </th>

                                    <th>
                                        Category
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {complaints
                                    .slice(0, 5)
                                    .map(
                                        (complaint) => (

                                            <tr
                                                key={
                                                    complaint.id ||
                                                    complaint.complaintNumber
                                                }
                                                className="clickable-row"
                                                onClick={() => {

                                                    if (
                                                        complaint.id
                                                    ) {

                                                        navigate(
                                                            `/citizen/complaints/${complaint.id}`
                                                        );

                                                    }

                                                }}
                                            >

                                                <td>
                                                    {
                                                        complaint.complaintNumber ||
                                                        "N/A"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        complaint.subject ||
                                                        "N/A"
                                                    }
                                                </td>


                                                <td>

                                                    {
                                                        complaint.aiCategory ||
                                                        complaint.category ||
                                                        "Pending"
                                                    }

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            getComplaintStatusClass(
                                                                complaint.status
                                                            )
                                                        }
                                                    >

                                                        {
                                                            getComplaintStatusLabel(
                                                                complaint.status
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <button
                                                        className="recent-view-btn"
                                                        onClick={(
                                                            event
                                                        ) => {

                                                            event.stopPropagation();


                                                            if (
                                                                complaint.id
                                                            ) {

                                                                navigate(
                                                                    `/citizen/complaints/${complaint.id}`
                                                                );

                                                            }

                                                        }}
                                                    >
                                                        👁 View
                                                    </button>

                                                </td>

                                            </tr>

                                        )
                                    )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );

}


export default CitizenDashboard;