import "./OfficerIncomeApplicationDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getIncomeApplicationById,
    approveIncomeApplication,
    rejectIncomeApplication
} from "../../api/api";

function OfficerIncomeApplicationDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const loadApplication = async () => {

        try {

            setLoading(true);

            const response =
                await getIncomeApplicationById(id);

            setApplication(response.data);

        }
        catch (error) {

            console.log(error);

            alert(
                "Unable to load application details."
            );

        }
        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadApplication();

    }, [id]);


    const handleApprove = async () => {

        const confirmApprove =
            window.confirm(
                "Approve this income certificate application?"
            );

        if (!confirmApprove) {
            return;
        }

        try {

            await approveIncomeApplication(id);

            alert(
                "Income Certificate Approved Successfully."
            );

            await loadApplication();

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed to approve application."
            );

        }

    };


    const handleReject = async () => {

        const confirmReject =
            window.confirm(
                "Reject this income certificate application?"
            );

        if (!confirmReject) {
            return;
        }

        try {

            await rejectIncomeApplication(id);

            alert(
                "Income Certificate Rejected Successfully."
            );

            await loadApplication();

        }
        catch (error) {

            console.log(error);

            alert(
                "Failed to reject application."
            );

        }

    };


    if (loading) {

        return (

            <div className="income-officer-loading">

                <h2>
                    Loading Application...
                </h2>

            </div>

        );

    }


    if (!application) {

        return (

            <div className="income-officer-details">

                <h2>
                    Application Not Found
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/officer/income-applications"
                        )
                    }
                >
                    ← Back
                </button>

            </div>

        );

    }


    return (

        <div className="income-officer-details">

            <div className="income-details-card">

                <div className="income-details-header">

                    <div>

                        <h1>
                            💰 Income Certificate Application
                        </h1>

                        <p>
                            Review applicant information
                        </p>

                    </div>


                    <span
                        className={
                            application.status === "APPROVED"
                                ? "status-approved"
                                : application.status === "REJECTED"
                                ? "status-rejected"
                                : "status-pending"
                        }
                    >
                        {application.status}
                    </span>

                </div>


                <div className="income-details-section">

                    <h2>
                        📋 Application Information
                    </h2>

                    <div className="income-details-grid">

                        <div>
                            <label>
                                Application Number
                            </label>

                            <p>
                                {
                                    application.applicationNumber
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Applicant Name
                            </label>

                            <p>
                                {
                                    application.applicantName
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Father Name
                            </label>

                            <p>
                                {
                                    application.fatherName
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Date of Birth
                            </label>

                            <p>
                                {
                                    application.dateOfBirth
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Gender
                            </label>

                            <p>
                                {
                                    application.gender
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Mobile
                            </label>

                            <p>
                                {
                                    application.mobile
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Email
                            </label>

                            <p>
                                {
                                    application.email
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Occupation
                            </label>

                            <p>
                                {
                                    application.occupation
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Annual Income
                            </label>

                            <p>
                                ₹ {application.annualIncome}
                            </p>
                        </div>


                        <div>
                            <label>
                                Income Source
                            </label>

                            <p>
                                {
                                    application.incomeSource
                                }
                            </p>
                        </div>


                        <div>
                            <label>
                                Purpose
                            </label>

                            <p>
                                {
                                    application.purpose
                                }
                            </p>
                        </div>

                    </div>

                </div>


                <div className="income-details-section">

                    <h2>
                        📍 Address
                    </h2>

                    <div className="income-details-grid">

                        <div>
                            <label>Village</label>

                            <p>
                                {application.village}
                            </p>
                        </div>


                        <div>
                            <label>Taluka</label>

                            <p>
                                {application.taluka}
                            </p>
                        </div>


                        <div>
                            <label>District</label>

                            <p>
                                {application.district}
                            </p>
                        </div>


                        <div>
                            <label>State</label>

                            <p>
                                {application.state}
                            </p>
                        </div>


                        <div>
                            <label>Pincode</label>

                            <p>
                                {application.pincode}
                            </p>
                        </div>

                    </div>

                </div>


                <div className="income-details-actions">

                    {application.status === "PENDING" && (

                        <>

                            <button
                                className="approve-income-btn"
                                onClick={handleApprove}
                            >
                                ✓ Approve Application
                            </button>


                            <button
                                className="reject-income-btn"
                                onClick={handleReject}
                            >
                                ✕ Reject Application
                            </button>

                        </>

                    )}


                    <button
                        className="back-income-btn"
                        onClick={() =>
                            navigate(
                                "/officer/income-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        </div>

    );

}

export default OfficerIncomeApplicationDetails;