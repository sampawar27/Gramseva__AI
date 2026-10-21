import "./OfficerApplications.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllBirthApplications,
    getAllIncomeApplications,
    approveApplication,
    rejectApplication,
    approveIncomeApplication,
    rejectIncomeApplication
} from "../api/officerApi";


function OfficerApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filter, setFilter] = useState("ALL");


    // =====================================================
    // LOAD APPLICATIONS
    // =====================================================

    useEffect(() => {

        loadApplications();

    }, []);


    const loadApplications = async () => {

        try {

            setLoading(true);

            const [
                birthResponse,
                incomeResponse
            ] = await Promise.all([

                getAllBirthApplications(),

                getAllIncomeApplications()

            ]);


            const birthApplications =
                Array.isArray(birthResponse.data)
                    ? birthResponse.data
                    : [];


            const incomeApplications =
                Array.isArray(incomeResponse.data)
                    ? incomeResponse.data
                    : [];


            const birthData =
                birthApplications.map(
                    (application) => ({

                        ...application,

                        certificateType:
                            "Birth Certificate",

                        applicationType:
                            "BIRTH"

                    })
                );


            const incomeData =
                incomeApplications.map(
                    (application) => ({

                        ...application,

                        certificateType:
                            "Income Certificate",

                        applicationType:
                            "INCOME"

                    })
                );


            setApplications([

                ...birthData,

                ...incomeData

            ]);

        }
        catch (error) {

            console.error(
                "Error loading applications:",
                error
            );

            setApplications([]);

        }
        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // FILTER
    // =====================================================

    const filteredApplications =
        filter === "ALL"

            ? applications

            : applications.filter(
                (application) =>
                    application.applicationType ===
                    filter
            );


    // =====================================================
    // APPROVE
    // =====================================================

    const handleApprove = async (application) => {

        try {

            if (application.applicationType === "BIRTH") {

                await approveApplication(
                    application.id
                );

            }
            else if (
                application.applicationType === "INCOME"
            ) {

                await approveIncomeApplication(
                    application.id
                );

            }


            alert(
                "Application approved successfully."
            );


            loadApplications();

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

    };


    // =====================================================
    // REJECT
    // =====================================================

    const handleReject = async (application) => {

        try {

            if (application.applicationType === "BIRTH") {

                await rejectApplication(
                    application.id
                );

            }
            else if (
                application.applicationType === "INCOME"
            ) {

                await rejectIncomeApplication(
                    application.id
                );

            }


            alert(
                "Application rejected successfully."
            );


            loadApplications();

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
    // RETURN
    // =====================================================

    return (

        <div className="officer-applications">

            {/* =================================================
                HEADER
            ================================================= */}

            <header className="applications-header">

                <div>

                    <h1>
                        GramSeva AI
                    </h1>

                    <p>
                        Officer Application Management
                    </p>

                </div>


                <div className="header-buttons">

                    <button
                        onClick={() =>
                            navigate("/officer/dashboard")
                        }
                    >
                        ← Dashboard
                    </button>


                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </header>


            {/* =================================================
                TITLE
            ================================================= */}

            <div className="applications-container">

                <div className="page-title">

                    <div>

                        <h2>
                            📄 Citizen Applications
                        </h2>

                        <p>
                            Review and manage certificate
                            applications submitted by citizens.
                        </p>

                    </div>


                    <button
                        className="refresh-button"
                        onClick={loadApplications}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* =================================================
                    FILTERS
                ================================================= */}

                <div className="application-filters">

                    <button
                        className={
                            filter === "ALL"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilter("ALL")
                        }
                    >
                        All
                    </button>


                    <button
                        className={
                            filter === "BIRTH"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilter("BIRTH")
                        }
                    >
                        🍼 Birth Certificates
                    </button>


                    <button
                        className={
                            filter === "INCOME"
                                ? "active"
                                : ""
                        }
                        onClick={() =>
                            setFilter("INCOME")
                        }
                    >
                        💰 Income Certificates
                    </button>

                </div>


                {/* =================================================
                    APPLICATION TABLE
                ================================================= */}

                {loading ? (

                    <div className="applications-empty">

                        <div>
                            ⏳
                        </div>

                        <h3>
                            Loading Applications...
                        </h3>

                    </div>

                ) : filteredApplications.length === 0 ? (

                    <div className="applications-empty">

                        <div>
                            📭
                        </div>

                        <h3>
                            No Applications Found
                        </h3>

                        <p>
                            There are no applications
                            available for this filter.
                        </p>

                    </div>

                ) : (

                    <div className="applications-table-wrapper">

                        <table className="applications-table">

                            <thead>

                                <tr>

                                    <th>
                                        Application No
                                    </th>

                                    <th>
                                        Citizen
                                    </th>

                                    <th>
                                        Certificate
                                    </th>

                                    <th>
                                        Village ID
                                    </th>

                                    <th>
                                        Date
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

                                {filteredApplications.map(
                                    (application) => (

                                        <tr
                                            key={
                                                application.id ||
                                                application.applicationNumber
                                            }
                                        >

                                            <td>
                                                {
                                                    application.applicationNumber ||
                                                    "N/A"
                                                }
                                            </td>


                                            <td>
                                                {
                                                    application.fullName ||
                                                    application.name ||
                                                    "Citizen"
                                                }
                                            </td>


                                            <td>
                                                {
                                                    application.certificateType
                                                }
                                            </td>


                                            <td>
                                                {
                                                    application.villageId ||
                                                    "N/A"
                                                }
                                            </td>


                                            <td>
                                                {
                                                    application.appliedDate ||
                                                    application.createdAt ||
                                                    "N/A"
                                                }
                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        `application-status ${
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

                                            </td>


                                            <td>

                                                <div className="action-buttons">

                                                    <button
                                                        className="approve-button"
                                                        disabled={
                                                            application.status ===
                                                            "APPROVED"
                                                        }
                                                        onClick={() =>
                                                            handleApprove(
                                                                application
                                                            )
                                                        }
                                                    >
                                                        ✅ Approve
                                                    </button>

<button
    className="view-button"
    onClick={() =>
        navigate(
            `/officer/applications/${application.id}?type=${application.applicationType}`
        )
    }
>
    👁 View
</button>
                                                    <button
                                                        className="reject-button"
                                                        disabled={
                                                            application.status ===
                                                            "REJECTED"
                                                        }
                                                        onClick={() =>
                                                            handleReject(
                                                                application
                                                            )
                                                        }
                                                    >
                                                        ❌ Reject
                                                    </button>

                                                </div>

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


export default OfficerApplications;