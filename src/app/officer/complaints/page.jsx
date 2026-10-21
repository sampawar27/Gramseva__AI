"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function OfficerComplaints() {

    const router = useRouter();

    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/officer/login");
            return;
        }

        loadComplaints();

    }, []);

    const loadComplaints = async () => {

        try {

            const data = await apiRequest(
                "/api/officer/complaints"
            );

            setComplaints(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const getStatusClass = (status) => {

        if (status === "RESOLVED") {
            return "resolved";
        }

        if (status === "IN_PROGRESS") {
            return "progress";
        }

        if (status === "ASSIGNED") {
            return "assigned";
        }

        return "pending";
    };


    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading complaints...</h2>
            </div>
        );
    }


    if (error) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Error loading complaints</h2>
                <p>{error}</p>

                <button
                    onClick={() =>
                        router.push("/officer/dashboard")
                    }
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f5f7fa",
                padding: "30px"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "30px"
                }}
            >

                <div>

                    <h1>
                        My Complaints
                    </h1>

                    <p>
                        Complaints assigned to you
                    </p>

                </div>


                <button
                    onClick={() =>
                        router.push(
                            "/officer/dashboard"
                        )
                    }
                    style={{
                        padding: "10px 18px",
                        cursor: "pointer"
                    }}
                >
                    ← Dashboard
                </button>

            </div>


            {/* NO COMPLAINTS */}

            {complaints.length === 0 && (

                <div
                    style={{
                        background: "white",
                        padding: "40px",
                        textAlign: "center",
                        borderRadius: "10px"
                    }}
                >

                    <h2>
                        No Complaints Found
                    </h2>

                    <p>
                        There are currently no complaints
                        assigned to you.
                    </p>

                </div>

            )}


            {/* COMPLAINT LIST */}

            {complaints.length > 0 && (

                <div
                    style={{
                        display: "grid",
                        gap: "20px"
                    }}
                >

                    {complaints.map((complaint) => (

                        <div
                            key={complaint.id}
                            style={{
                                background: "white",
                                padding: "25px",
                                borderRadius: "10px",
                                boxShadow:
                                    "0 2px 10px rgba(0,0,0,0.08)"
                            }}
                        >

                            {/* TOP */}

                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center"
                                }}
                            >

                                <h2>
                                    {complaint.complaintNumber}
                                </h2>

                                <span
                                    className={getStatusClass(
                                        complaint.status
                                    )}
                                    style={{
                                        padding:
                                            "6px 12px",
                                        borderRadius:
                                            "20px",
                                        background:
                                            "#e5e7eb"
                                    }}
                                >
                                    {complaint.status}
                                </span>

                            </div>


                            {/* SUBJECT */}

                            <h3>
                                {complaint.subject}
                            </h3>


                            {/* DESCRIPTION */}

                            <p>
                                {complaint.description}
                            </p>


                            {/* DETAILS */}

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(2, 1fr)",
                                    gap: "10px",
                                    marginTop: "15px"
                                }}
                            >

                                <p>
                                    <strong>
                                        Citizen:
                                    </strong>{" "}
                                    {complaint.citizenName}
                                </p>

                                <p>
                                    <strong>
                                        Mobile:
                                    </strong>{" "}
                                    {complaint.mobile}
                                </p>

                                <p>
                                    <strong>
                                        Category:
                                    </strong>{" "}
                                    {complaint.category}
                                </p>

                                <p>
                                    <strong>
                                        Priority:
                                    </strong>{" "}
                                    {complaint.priority}
                                </p>

                                <p>
                                    <strong>
                                        Village:
                                    </strong>{" "}
                                    {complaint.villageId}
                                </p>

                                <p>
                                    <strong>
                                        Location:
                                    </strong>{" "}
                                    {complaint.location}
                                </p>

                            </div>


                            {/* BUTTON */}

                            <button
                                onClick={() =>
                                    router.push(
                                        `/officer/complaints/${complaint.complaintNumber}`
                                    )
                                }
                                style={{
                                    marginTop: "20px",
                                    padding:
                                        "10px 20px",
                                    background:
                                        "#166534",
                                    color: "white",
                                    border: "none",
                                    borderRadius:
                                        "6px",
                                    cursor: "pointer"
                                }}
                            >
                                View Complaint
                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}