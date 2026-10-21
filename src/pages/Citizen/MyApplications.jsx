import React from "react";
import { useNavigate } from "react-router-dom";

function MyApplications() {

    const navigate = useNavigate();

    return (

        <div style={{ padding: "30px" }}>

            <h1>My Applications</h1>

            <p>
                Your submitted applications will appear here.
            </p>

            <button
                onClick={() =>
                    navigate("/citizen/dashboard")
                }
            >
                Back to Dashboard
            </button>

        </div>

    );

}

export default MyApplications;