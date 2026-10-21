import "./OfficerApplications.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllBirthApplications,
    approveApplication,
    rejectApplication
} from "../../api/api";

function OfficerApplications() {

    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);

    const [actionLoading, setActionLoading] = useState(false);


    // =====================================================
    // LOAD ONLY BIRTH CERTIFICATE APPLICATIONS
    // =====================================================

    const loadApplications = async () => {

        try {

            setLoading(true);

            const response =
                await getAllBirthApplications();

            console.log(
                "BIRTH API RESPONSE:",
                response.data
            );

            // IMPORTANT:
            // Only accept BC applications here

            const birthApplications =
                (response.data || []).filter(
                    (app) =>
                        app.applicationNumber &&
                        app.applicationNumber.startsWith("BC")
                );

            setApplications(
                birthApplications
            );

        } catch (error) {

            console.error(
                "Birth Certificate Error:",
                error
            );

            alert(
                "Unable to load birth certificate applications."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadApplications();

    }, []);


    // =====================================================
    // VIEW
    // =====================================================

    const handleView = (id) => {

        navigate(
            `/officer/applications/${id}`
        );

    };


    // =====================================================
    // APPROVE
    // =====================================================

    const handleApprove = async (id) => {

        const confirmed =
            window.confirm(
                "Approve this birth certificate application?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);

            await approveApplication(id);

            alert(
                "Birth Certificate Application Approved Successfully."
            );

            await loadApplications();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to approve application."
            );

        } finally {

            setActionLoading(false);

        }

    };


    // =====================================================
    // REJECT
    // =====================================================

    const handleReject = async (id) => {

        const confirmed =
            window.confirm(
                "Reject this birth certificate application?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setActionLoading(true);

            await rejectApplication(id);

            alert(
                "Birth Certificate Application Rejected Successfully."
            );

            await loadApplications();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to reject application."
            );

        } finally {

            setActionLoading(false);

        }

    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (status === "APPROVED") {
            return "status-approved";
        }

        if (status === "REJECTED") {
            return "status-rejected";
        }

        return "status-pending";

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="applications-loading">

                <h2>
                    Loading Birth Applications...
                </h2>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="officer-applications">

            {/* HEADER */}

            <div className="applications-header">

                <div>

                    <h1>
                        📄 Birth Certificate Applications
                    </h1>

                    <p>
                        View and manage birth certificate
                        applications.
                    </p>

                </div>


                <button
                    className="refresh-btn"
                    onClick={loadApplications}
                    disabled={actionLoading}
                >
                    🔄 Refresh
                </button>

            </div>


            {/* TABLE */}

            <div className="table-container">

                <table>

                    <thead>

                        <tr>

                            <th>
                                Application No
                            </th>

                            <th>
                                Applicant
                            </th>

                            <th>
                                Child
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

                        {applications.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="no-applications"
                                >
                                    No Birth Certificate
                                    Applications Found
                                </td>

                            </tr>

                        ) : (

                            applications.map(
                                (app) => (

                                    <tr
                                        key={app.id}
                                    >

                                        <td>

                                            <strong>
                                                {
                                                    app.applicationNumber
                                                }
                                            </strong>

                                        </td>


                                        <td>
                                            {
                                                app.applicantName
                                            }
                                        </td>


                                        <td>
                                            {
                                                app.childName
                                            }
                                        </td>


                                        <td>

                                            <span
                                                className={`status-badge ${getStatusClass(
                                                    app.status
                                                )}`}
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

                                            <div className="action-buttons">

                                                <button
                                                    className="view-btn"
                                                    onClick={() =>
                                                        handleView(
                                                            app.id
                                                        )
                                                    }
                                                >
                                                    👁 View
                                                </button>


                                                {app.status ===
                                                    "PENDING" && (

                                                    <>

                                                        <button
                                                            className="approve-btn"
                                                            onClick={() =>
                                                                handleApprove(
                                                                    app.id
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading
                                                            }
                                                        >
                                                            ✓ Approve
                                                        </button>


                                                        <button
                                                            className="reject-btn"
                                                            onClick={() =>
                                                                handleReject(
                                                                    app.id
                                                                )
                                                            }
                                                            disabled={
                                                                actionLoading
                                                            }
                                                        >
                                                            ✕ Reject
                                                        </button>

                                                    </>

                                                )}


                                                {app.status ===
                                                    "APPROVED" && (

                                                    <span className="processed-label approved-label">
                                                        ✓ Approved
                                                    </span>

                                                )}


                                                {app.status ===
                                                    "REJECTED" && (

                                                    <span className="processed-label rejected-label">
                                                        ✕ Rejected
                                                    </span>

                                                )}

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* FOOTER */}

            <div className="applications-footer">

                <span>
                    Total Applications:{" "}
                    <strong>
                        {applications.length}
                    </strong>
                </span>


                <span>
                    Pending:{" "}
                    <strong>
                        {
                            applications.filter(
                                (app) =>
                                    app.status ===
                                    "PENDING"
                            ).length
                        }
                    </strong>
                </span>


                <span>
                    Approved:{" "}
                    <strong>
                        {
                            applications.filter(
                                (app) =>
                                    app.status ===
                                    "APPROVED"
                            ).length
                        }
                    </strong>
                </span>


                <span>
                    Rejected:{" "}
                    <strong>
                        {
                            applications.filter(
                                (app) =>
                                    app.status ===
                                    "REJECTED"
                            ).length
                        }
                    </strong>
                </span>

            </div>

        </div>

    );

}

export default OfficerApplications;