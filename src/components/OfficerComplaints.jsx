import "./OfficerComplaints.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getOfficerComplaints,
    getDepartmentComplaints
} from "../api/officerApi";


function OfficerComplaints() {

    const navigate = useNavigate();

    const [officer, setOfficer] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD OFFICER
    // =====================================================

    useEffect(() => {

        const storedOfficer =
            localStorage.getItem("officer");

        if (!storedOfficer) {

            navigate("/officer/login");

            return;
        }

        try {

            const officerData =
                JSON.parse(storedOfficer);

            setOfficer(officerData);

            loadComplaints(officerData);

        } catch (error) {

            console.error(
                "Invalid officer data:",
                error
            );

            localStorage.removeItem("officer");
            localStorage.removeItem("officerToken");

            navigate("/officer/login");
        }

    }, [navigate]);


    // =====================================================
    // LOAD COMPLAINTS
    // =====================================================

    const loadComplaints = async (officerData) => {

        try {

            setLoading(true);

            let response;

            // =================================================
            // DEPARTMENT HEAD
            // =================================================

            if (
                officerData.department &&
                officerData.department.trim() !== ""
            ) {

                response =
                    await getDepartmentComplaints(
                        officerData.department
                    );

            }

            // =================================================
            // GENERAL OFFICER
            // =================================================

            else {

                response =
                    await getOfficerComplaints(
                        officerData.officerId
                    );
            }


            const data =
                Array.isArray(response?.data)
                    ? response.data
                    : [];


            setComplaints(data);

        } catch (error) {

            console.error(
                "Error loading complaints:",
                error
            );

            setComplaints([]);

        } finally {

            setLoading(false);
        }
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
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (status === "RESOLVED") {
            return "resolved";
        }

        if (status === "IN_PROGRESS") {
            return "in-progress";
        }

        if (status === "ASSIGNED") {
            return "assigned";
        }

        return "submitted";
    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="officer-complaints-page">

            {/* HEADER */}

            <header className="complaints-header">

                <div>

                    <h1>
                        🚨 Officer Complaints
                    </h1>

                    <p>
                        Manage citizen complaints
                    </p>

                </div>


                <div>

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
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </header>


            {/* CONTENT */}

            <main className="complaints-content">

                <h2>
                    Welcome,{" "}
                    {officer?.fullName || "Officer"}
                </h2>


                {/* DEPARTMENT */}

                {officer?.department && (

                    <p className="department-name">

                        🏢 Department:

                        <strong>
                            {" "}
                            {officer.department}
                        </strong>

                    </p>

                )}


                {/* LOADING */}

                {loading ? (

                    <div className="complaints-empty">

                        <div>
                            ⏳
                        </div>

                        <h3>
                            Loading Complaints...
                        </h3>

                    </div>

                ) : complaints.length === 0 ? (

                    <div className="complaints-empty">

                        <div>
                            📭
                        </div>

                        <h3>
                            No Complaints Found
                        </h3>

                        <p>
                            There are no complaints
                            available for this officer
                            or department.
                        </p>

                    </div>

                ) : (

                    /* COMPLAINT CARDS */

                    <div className="complaints-grid">

                        {complaints.map(
                            (complaint) => (

                                <div
                                    className="complaint-card"
                                    key={
                                        complaint.id ||
                                        complaint.complaintNumber
                                    }
                                >

                                    <div className="complaint-card-header">

                                        <h3>
                                            🚨{" "}
                                            {
                                                complaint.complaintNumber
                                            }
                                        </h3>

                                        <span
                                            className={
                                                `complaint-status ${
                                                    getStatusClass(
                                                        complaint.status
                                                    )
                                                }`
                                            }
                                        >
                                            {
                                                complaint.status ||
                                                "SUBMITTED"
                                            }
                                        </span>

                                    </div>


                                    <h4>
                                        {
                                            complaint.subject ||
                                            "No Subject"
                                        }
                                    </h4>


                                    <p>
                                        {
                                            complaint.description ||
                                            "No description available."
                                        }
                                    </p>


                                    <div className="complaint-info">

                                        <div>
                                            <strong>
                                                Citizen:
                                            </strong>{" "}
                                            {
                                                complaint.citizenName ||
                                                "N/A"
                                            }
                                        </div>


                                        <div>
                                            <strong>
                                                Village ID:
                                            </strong>{" "}
                                            {
                                                complaint.villageId ||
                                                "N/A"
                                            }
                                        </div>


                                        <div>
                                            <strong>
                                                Department:
                                            </strong>{" "}
                                            {
                                                complaint.department ||
                                                "Not classified"
                                            }
                                        </div>


                                        <div>
                                            <strong>
                                                Priority:
                                            </strong>{" "}
                                            {
                                                complaint.priority ||
                                                "N/A"
                                            }
                                        </div>


                                        <div>
                                            <strong>
                                                Location:
                                            </strong>{" "}
                                            {
                                                complaint.location ||
                                                "N/A"
                                            }
                                        </div>

                                    </div>


                                    <button
                                        className="view-complaint-button"
                                        onClick={() =>
                                            navigate(
                                                `/officer/complaints/${complaint.complaintNumber}`
                                            )
                                        }
                                    >
                                        👁 View Complaint
                                    </button>

                                </div>

                            )
                        )}

                    </div>

                )}

            </main>

        </div>
    );
}


export default OfficerComplaints;