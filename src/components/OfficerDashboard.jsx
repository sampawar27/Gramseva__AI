import "./OfficerDashboard.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function OfficerDashboard() {

    const navigate = useNavigate();

    const [officer, setOfficer] = useState(null);


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

        }
        catch (error) {

            console.error(
                "Invalid officer data:",
                error
            );

            localStorage.removeItem("officer");

            navigate("/officer/login");

        }

    }, [navigate]);


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

        <div className="officer-dashboard">

            {/* HEADER */}

            <header className="officer-header">

                <div>

                    <h1>
                        GramSeva AI
                    </h1>

                    <p>
                        Officer Dashboard
                    </p>

                </div>


                <div className="officer-header-right">

                    <div className="officer-info">

                        <strong>
                            👨‍💼{" "}
                            {officer?.fullName ||
                                "Officer"}
                        </strong>

                        <span>
                            Officer ID:{" "}
                            {officer?.officerId ||
                                "N/A"}
                        </span>

                    </div>


                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </header>


            {/* WELCOME */}

            <section className="officer-welcome">

                <h2>
                    Welcome,{" "}
                    {officer?.fullName ||
                        "Officer"} 👋
                </h2>

                <p>
                    Manage citizen applications
                    and village complaints from
                    one place.
                </p>

            </section>


            {/* DASHBOARD CARDS */}

            <section className="quick-actions">

                <div
                    className="action-card"
                    onClick={() =>
                        navigate(
                            "/officer/applications"
                        )
                    }
                >

                    <div>
                        📄
                    </div>

                    <h3>
                        Applications
                    </h3>

                    <p>
                        Review and manage
                        citizen certificate
                        applications.
                    </p>

                    <button>
                        Manage →
                    </button>

                </div>


                <div
                    className="action-card"
                    onClick={() =>
                        navigate(
                            "/officer/complaints"
                        )
                    }
                >

                    <div>
                        🚨
                    </div>

                    <h3>
                        Complaints
                    </h3>

                    <p>
                        View and manage
                        citizen complaints.
                    </p>

                    <button>
                        Manage →
                    </button>

                </div>

            </section>

        </div>

    );

}


export default OfficerDashboard;