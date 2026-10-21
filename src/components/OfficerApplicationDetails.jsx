import "./OfficerApplicationDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import {
    getAllBirthApplications,
    getAllIncomeApplications,
    approveApplication,
    rejectApplication,
    approveIncomeApplication,
    rejectIncomeApplication
} from "../api/officerApi";


function OfficerApplicationDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [searchParams] = useSearchParams();

    const type = searchParams.get("type");

    const [application, setApplication] = useState(null);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] =
        useState(false);


    // =====================================================
    // LOAD APPLICATION
    // =====================================================

    useEffect(() => {

        loadApplication();

    }, [id, type]);


    const loadApplication = async () => {

        try {

            setLoading(true);

            let response;


            if (type === "INCOME") {

                response =
                    await getAllIncomeApplications();

            }
            else {

                response =
                    await getAllBirthApplications();

            }


            const applications =
                Array.isArray(response.data)
                    ? response.data
                    : [];


            const found =
                applications.find(
                    (item) =>
                        String(item.id) === String(id)
                );


            if (found) {

                setApplication({

                    ...found,

                    certificateType:
                        type === "INCOME"
                            ? "Income Certificate"
                            : "Birth Certificate"

                });

            }
            else {

                setApplication(null);

            }

        }
        catch (error) {

            console.error(
                "Error loading application:",
                error
            );

            setApplication(null);

        }
        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // APPROVE
    // =====================================================

    const handleApprove = async () => {

        if (!application) {
            return;
        }


        try {

            setActionLoading(true);


            if (type === "INCOME") {

                await approveIncomeApplication(
                    application.id
                );

            }
            else {

                await approveApplication(
                    application.id
                );

            }


            alert(
                "Application approved successfully."
            );


            await loadApplication();

        }
        catch (error) {

            console.error(
                "Approve error:",
                error
            );

            alert(
                "Unable to approve application."
            );

        }
        finally {

            setActionLoading(false);

        }

    };


    // =====================================================
    // REJECT
    // =====================================================

    const handleReject = async () => {

        if (!application) {
            return;
        }


        try {

            setActionLoading(true);


            if (type === "INCOME") {

                await rejectIncomeApplication(
                    application.id
                );

            }
            else {

                await rejectApplication(
                    application.id
                );

            }


            alert(
                "Application rejected successfully."
            );


            await loadApplication();

        }
        catch (error) {

            console.error(
                "Reject error:",
                error
            );

            alert(
                "Unable to reject application."
            );

        }
        finally {

            setActionLoading(false);

        }

    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (status === "APPROVED") {
            return "approved";
        }

        if (status === "REJECTED") {
            return "rejected";
        }

        return "pending";

    };


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("officer");

        localStorage.removeItem("officerToken");

        navigate("/officer/login");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="application-details-page">

                <div className="details-loading">

                    ⏳ Loading application...

                </div>

            </div>

        );

    }


    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!application) {

        return (

            <div className="application-details-page">

                <header className="details-header">

                    <h1>
                        GramSeva AI
                    </h1>

                    <button
                        onClick={() =>
                            navigate(
                                "/officer/applications"
                            )
                        }
                    >
                        ← Applications
                    </button>

                </header>


                <div className="details-not-found">

                    <div>
                        📭
                    </div>

                    <h2>
                        Application Not Found
                    </h2>

                    <p>
                        The requested application
                        could not be found.
                    </p>

                    <button
                        onClick={() =>
                            navigate(
                                "/officer/applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="application-details-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="details-header">

                <div>

                    <h1>
                        GramSeva AI
                    </h1>

                    <p>
                        Application Details
                    </p>

                </div>


                <div className="details-header-buttons">

                    <button
                        onClick={() =>
                            navigate(
                                "/officer/dashboard"
                            )
                        }
                    >
                        Dashboard
                    </button>


                    <button
                        onClick={() =>
                            navigate(
                                "/officer/applications"
                            )
                        }
                    >
                        ← Applications
                    </button>


                    <button
                        className="details-logout"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="details-container">

                {/* TITLE */}

                <div className="details-title">

                    <div>

                        <h2>
                            📄{" "}
                            {application.certificateType}
                        </h2>

                        <p>
                            Application Number:{" "}
                            <strong>
                                {
                                    application.applicationNumber ||
                                    "N/A"
                                }
                            </strong>
                        </p>

                    </div>


                    <span
                        className={
                            `details-status ${
                                getStatusClass(
                                    application.status
                                )
                            }`
                        }
                    >
                        {
                            application.status ||
                            "PENDING"
                        }
                    </span>

                </div>


                {/* =================================================
                    CITIZEN INFORMATION
                ================================================= */}

                <section className="details-card">

                    <h3>
                        👤 Citizen Information
                    </h3>


                    <div className="details-grid">

                        <div className="detail-item">

                            <span>
                                Full Name
                            </span>

                            <strong>
                                {
                                    application.fullName ||
                                    application.name ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Village ID
                            </span>

                            <strong>
                                {
                                    application.villageId ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Mobile
                            </span>

                            <strong>
                                {
                                    application.mobile ||
                                    application.mobileNumber ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Email
                            </span>

                            <strong>
                                {
                                    application.email ||
                                    "N/A"
                                }
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    APPLICATION INFORMATION
                ================================================= */}

                <section className="details-card">

                    <h3>
                        📋 Application Information
                    </h3>


                    <div className="details-grid">

                        <div className="detail-item">

                            <span>
                                Certificate Type
                            </span>

                            <strong>
                                {
                                    application.certificateType
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Application Number
                            </span>

                            <strong>
                                {
                                    application.applicationNumber ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Applied Date
                            </span>

                            <strong>
                                {
                                    application.appliedDate ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Current Status
                            </span>

                            <strong>
                                {
                                    application.status ||
                                    "PENDING"
                                }
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    EXTRA INFORMATION
                ================================================= */}

                <section className="details-card">

                    <h3>
                        📝 Additional Information
                    </h3>


                    <div className="details-grid">

                        <div className="detail-item">

                            <span>
                                Address
                            </span>

                            <strong>
                                {
                                    application.address ||
                                    application.residenceAddress ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                Taluka
                            </span>

                            <strong>
                                {
                                    application.taluka ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                District
                            </span>

                            <strong>
                                {
                                    application.district ||
                                    "N/A"
                                }
                            </strong>

                        </div>


                        <div className="detail-item">

                            <span>
                                State
                            </span>

                            <strong>
                                {
                                    application.state ||
                                    "Maharashtra"
                                }
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ACTIONS
                ================================================= */}

                <section className="details-actions">

                    <h3>
                        Officer Action
                    </h3>


                    <p>
                        Review the application information
                        before taking an action.
                    </p>


                    <div className="action-buttons">

                        <button
                            className="approve-details-button"
                            disabled={
                                actionLoading ||
                                application.status ===
                                "APPROVED"
                            }
                            onClick={handleApprove}
                        >
                            {actionLoading
                                ? "Processing..."
                                : "✅ Approve Application"
                            }
                        </button>


                        <button
                            className="reject-details-button"
                            disabled={
                                actionLoading ||
                                application.status ===
                                "REJECTED"
                            }
                            onClick={handleReject}
                        >
                            {actionLoading
                                ? "Processing..."
                                : "❌ Reject Application"
                            }
                        </button>

                    </div>

                </section>

            </main>

        </div>

    );

}


export default OfficerApplicationDetails;