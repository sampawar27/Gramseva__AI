import "./Complaints.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getMyComplaints } from "../../api/complaintApi";


function Complaints() {

    const navigate = useNavigate();


    const [complaints, setComplaints] = useState([]);

    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD COMPLAINTS
    // =====================================================

    useEffect(() => {

        const loadComplaints = async () => {

            try {

                const storedUser =
                    localStorage.getItem("user");


                if (!storedUser) {

                    setLoading(false);

                    return;
                }


                const user =
                    JSON.parse(storedUser);


                if (!user?.villageId) {

                    setLoading(false);

                    return;
                }


                const response =
                    await getMyComplaints(
                        user.villageId
                    );


                setComplaints(
                    response?.data || []
                );

            } catch (error) {

                console.error(
                    "Complaint loading error:",
                    error
                );

                setComplaints([]);

            } finally {

                setLoading(false);
            }
        };


        loadComplaints();

    }, []);


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

            case "AI_VERIFIED":
                return "status-ai";

            case "ASSIGNED":
                return "status-progress";

            case "REOPENED":
                return "status-submitted";

            default:
                return "status-submitted";
        }
    };


    return (

        <div className="complaints-page">


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="complaints-header">

                <div>

                    <h1>
                        🚨 My Complaints
                    </h1>

                    <p>
                        Track your complaints and
                        their resolution status.
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
                    + Report a Problem
                </button>

            </div>


            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading ? (

                <div className="complaints-empty">

                    <h3>
                        Loading complaints...
                    </h3>

                </div>

            ) : complaints.length === 0 ? (

                /* =====================================================
                   EMPTY STATE
                ===================================================== */

                <div className="complaints-empty">

                    <div className="empty-icon">
                        📭
                    </div>

                    <h2>
                        No Complaints Yet
                    </h2>

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

                /* =====================================================
                   COMPLAINT LIST
                ===================================================== */

                <div className="complaints-list">

                    {complaints.map(
                        (complaint) => (

                            <div
                                className="complaint-card"
                                key={
                                    complaint.id ||
                                    complaint.complaintNumber
                                }
                            >


                                {/* HEADER */}

                                <div className="complaint-card-header">

                                    <div>

                                        <span className="complaint-number">

                                            {
                                                complaint.complaintNumber
                                            }

                                        </span>


                                        <h2>

                                            {
                                                complaint.subject
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


                                {/* DESCRIPTION */}

                                <p className="complaint-description">

                                    {
                                        complaint.description
                                    }

                                </p>


                                {/* DETAILS */}

                                <div className="complaint-details">


                                    <div>

                                        <span>
                                            📍 Location
                                        </span>

                                        <strong>

                                            {
                                                complaint.location ||
                                                "Not specified"
                                            }

                                        </strong>

                                    </div>


                                    <div>

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


                                    <div>

                                        <span>
                                            ⚡ AI Priority
                                        </span>

                                        <strong>

                                            {
                                                complaint.aiPriority ||
                                                "Pending"
                                            }

                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            🏢 Department
                                        </span>

                                        <strong>

                                            {
                                                complaint.department ||
                                                "Pending"
                                            }

                                        </strong>

                                    </div>


                                </div>


                                {/* AI VERIFICATION */}

                                <div className="ai-verification">

                                    <span>
                                        🤖 AI Verification:
                                    </span>


                                    <strong>

                                        {
                                            complaint.aiVerified
                                                ? " Verified"
                                                : " Pending"
                                        }

                                    </strong>


                                    {complaint.aiConfidence !== null &&
                                        complaint.aiConfidence !== undefined && (

                                            <span>

                                                {" "}
                                                (

                                                {
                                                    Math.round(
                                                        complaint.aiConfidence * 100
                                                    )
                                                }

                                                % confidence)

                                            </span>

                                        )}

                                </div>


                                {/* FOOTER */}

                                <div className="complaint-card-footer">

                                    <span>

                                        Submitted:{" "}

                                        {
                                            complaint.createdAt
                                                ? new Date(
                                                    complaint.createdAt
                                                ).toLocaleDateString()
                                                : "N/A"
                                        }

                                    </span>


                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/citizen/complaints/${complaint.id}`
                                            )
                                        }
                                    >

                                        View Details →

                                    </button>

                                </div>


                            </div>

                        )
                    )}

                </div>

            )}

        </div>

    );

}


export default Complaints;