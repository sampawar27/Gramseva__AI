"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function ComplaintDetails() {

    const params = useParams();
    const router = useRouter();

    const complaintNumber =
        params.complaintNumber;

    const [complaint, setComplaint] =
        useState(null);

    const [status, setStatus] =
        useState("");

    const [remarks, setRemarks] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");


    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            router.push("/officer/login");
            return;
        }

        loadComplaint();

    }, [complaintNumber]);


    const loadComplaint = async () => {

        try {

            const data =
                await apiRequest(
                    `/api/officer/complaints/${complaintNumber}`
                );

            setComplaint(data);

            setStatus(data.status || "");

            setRemarks(
                data.officerRemarks || ""
            );

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };


    const updateStatus = async () => {

        try {

            setMessage("");
            setError("");

            const data =
                await apiRequest(
                    `/api/officer/complaints/${complaintNumber}/status?status=${status}`,
                    {
                        method: "PUT"
                    }
                );

            setComplaint(data);

            setMessage(
                "Complaint status updated successfully."
            );

        } catch (error) {

            setError(error.message);
        }
    };


    const saveRemarks = async () => {

        try {

            setMessage("");
            setError("");

            const data =
                await apiRequest(
                    `/api/officer/complaints/${complaintNumber}/remarks?remarks=${encodeURIComponent(
                        remarks
                    )}`,
                    {
                        method: "PUT"
                    }
                );

            setComplaint(data);

            setMessage(
                "Remarks saved successfully."
            );

        } catch (error) {

            setError(error.message);
        }
    };


    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>
                    Loading complaint...
                </h2>
            </div>
        );
    }


    if (error && !complaint) {

        return (
            <div style={{ padding: "30px" }}>

                <h2>
                    Unable to load complaint
                </h2>

                <p>{error}</p>

                <button
                    onClick={() =>
                        router.push(
                            "/officer/complaints"
                        )
                    }
                >
                    Back
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

            <button
                onClick={() =>
                    router.push(
                        "/officer/complaints"
                    )
                }
                style={{
                    marginBottom: "20px",
                    padding: "10px 18px"
                }}
            >
                ← Back to Complaints
            </button>


            <div
                style={{
                    maxWidth: "900px",
                    margin: "auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px"
                }}
            >

                <h1>
                    Complaint Details
                </h1>

                <h2>
                    {complaint.complaintNumber}
                </h2>


                {message && (

                    <p
                        style={{
                            color: "green"
                        }}
                    >
                        {message}
                    </p>

                )}


                {error && (

                    <p
                        style={{
                            color: "red"
                        }}
                    >
                        {error}
                    </p>

                )}


                <hr />


                <h3>
                    {complaint.subject}
                </h3>

                <p>
                    {complaint.description}
                </p>


                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(2, 1fr)",
                        gap: "15px",
                        marginTop: "25px"
                    }}
                >

                    <p>
                        <strong>Citizen:</strong>{" "}
                        {complaint.citizenName}
                    </p>

                    <p>
                        <strong>Mobile:</strong>{" "}
                        {complaint.mobile}
                    </p>

                    <p>
                        <strong>Village:</strong>{" "}
                        {complaint.villageId}
                    </p>

                    <p>
                        <strong>Category:</strong>{" "}
                        {complaint.category}
                    </p>

                    <p>
                        <strong>AI Category:</strong>{" "}
                        {complaint.aiCategory}
                    </p>

                    <p>
                        <strong>AI Priority:</strong>{" "}
                        {complaint.aiPriority}
                    </p>

                    <p>
                        <strong>Department:</strong>{" "}
                        {complaint.department}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {complaint.location}
                    </p>

                </div>


                <hr
                    style={{
                        margin: "30px 0"
                    }}
                />


                {/* STATUS */}

                <h2>
                    Update Status
                </h2>

                <select
                    value={status}
                    onChange={(e) =>
                        setStatus(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "100%",
                        marginBottom: "15px"
                    }}
                >

                    <option value="ASSIGNED">
                        ASSIGNED
                    </option>

                    <option value="IN_PROGRESS">
                        IN_PROGRESS
                    </option>

                    <option value="RESOLVED">
                        RESOLVED
                    </option>

                </select>


                <button
                    onClick={updateStatus}
                    style={{
                        padding: "10px 20px",
                        background: "#166534",
                        color: "white",
                        border: "none",
                        borderRadius: "6px"
                    }}
                >
                    Update Status
                </button>


                {/* REMARKS */}

                <h2
                    style={{
                        marginTop: "30px"
                    }}
                >
                    Officer Remarks
                </h2>

                <textarea
                    value={remarks}
                    onChange={(e) =>
                        setRemarks(e.target.value)
                    }
                    placeholder="Enter remarks..."
                    rows="5"
                    style={{
                        width: "100%",
                        padding: "12px",
                        boxSizing: "border-box"
                    }}
                />


                <button
                    onClick={saveRemarks}
                    style={{
                        marginTop: "15px",
                        padding: "10px 20px",
                        background: "#166534",
                        color: "white",
                        border: "none",
                        borderRadius: "6px"
                    }}
                >
                    Save Remarks
                </button>

            </div>

        </div>
    );
}