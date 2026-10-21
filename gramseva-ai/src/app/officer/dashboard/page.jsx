"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function OfficerDashboard() {

    const router = useRouter();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/officer/login");
            return;
        }

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await apiRequest(
                "/api/officer/dashboard"
            );

            setDashboard(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("officerId");
        localStorage.removeItem("officerName");

        router.push("/officer/login");
    };

    if (loading) {
        return <h2>Loading dashboard...</h2>;
    }

    if (error) {
        return (
            <div>
                <h2>Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (

        <div style={{ padding: "30px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >

                <div>
                    <h1>Officer Dashboard</h1>

                    <p>
                        Welcome,{" "}
                        {dashboard?.officerName}
                    </p>

                </div>

                <button onClick={logout}>
                    Logout
                </button>

            </div>


            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(3, 1fr)",
                    gap: "20px",
                    marginTop: "30px"
                }}
            >

                <div>
                    <h3>Total Complaints</h3>
                    <h1>
                        {dashboard?.totalComplaints}
                    </h1>
                </div>


                <div>
                    <h3>Assigned</h3>
                    <h1>
                        {dashboard?.assignedComplaints}
                    </h1>
                </div>


                <div>
                    <h3>Pending</h3>
                    <h1>
                        {dashboard?.pendingComplaints}
                    </h1>
                </div>


                <div>
                    <h3>In Progress</h3>
                    <h1>
                        {dashboard?.inProgressComplaints}
                    </h1>
                </div>


                <div>
                    <h3>Resolved</h3>
                    <h1>
                        {dashboard?.resolvedComplaints}
                    </h1>
                </div>


                <div>
                    <h3>Submitted</h3>
                    <h1>
                        {dashboard?.submittedComplaints}
                    </h1>
                </div>

            </div>


            <button
                onClick={() =>
                    router.push(
                        "/officer/complaints"
                    )
                }
                style={{
                    marginTop: "30px",
                    padding: "12px 20px"
                }}
            >
                View My Complaints
            </button>

        </div>
    );
}