import "./ApplicationDetails.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getBirthCertificateById,
    downloadBirthCertificate
} from "../../api/api";

function ApplicationDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [application, setApplication] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadApplication();

    }, [id]);


    const loadApplication = async () => {

        try {

            setLoading(true);

            setError("");

            const response =
                await getBirthCertificateById(id);

            console.log(
                "Birth Certificate:",
                response.data
            );

            setApplication(response.data);

        }
        catch (error) {

            console.error(
                "Error loading application:",
                error
            );

            setError(
                "Unable to load application details."
            );

        }
        finally {

            setLoading(false);

        }

    };

     const handleDownload = async () => {

    try {

        const response =
            await downloadBirthCertificate(application.id);

        const blob =
            new Blob(
                [response.data],
                {
                    type: "application/pdf"
                }
            );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            `BirthCertificate-${application.applicationNumber}.pdf`;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

    }
    catch (error) {

        console.error(
            "Download error:",
            error
        );

        alert(
            "Unable to download certificate."
        );

    }

};
    const getStatusClass = (status) => {

        if (status === "APPROVED") {
            return "status-approved";
        }

        if (status === "REJECTED") {
            return "status-rejected";
        }

        return "status-pending";

    };


    if (loading) {

        return (

            <div className="application-details-page">

                <div className="details-card">

                    <h2>
                        Loading application...
                    </h2>

                </div>

            </div>

        );

    }


    if (error) {

        return (

            <div className="application-details-page">

                <div className="details-card">

                    <h2>
                        ❌ {error}
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    if (!application) {

        return (

            <div className="application-details-page">

                <div className="details-card">

                    <h2>
                        Application not found
                    </h2>

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="application-details-page">

            <div className="details-card">


                {/* ================= HEADER ================= */}

                <div className="details-header">

                    <div>

                        <h1>
                            📄 Application Details
                        </h1>

                        <p>
                            View your Birth Certificate
                            application information
                        </p>

                    </div>


                    <span
                        className={`application-status ${getStatusClass(
                            application.status
                        )}`}
                    >
                        {application.status}
                    </span>

                </div>


                {/* ================= APPLICATION INFORMATION ================= */}

                <div className="details-section">

                    <h2>
                        📋 Application Information
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Application Number
                            </label>

                            <p>
                                {application.applicationNumber}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Certificate Type
                            </label>

                            <p>
                                Birth Certificate
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Application Status
                            </label>

                            <p>
                                {application.status}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Applied Date
                            </label>

                            <p>
                                {application.appliedDate
                                    ? new Date(
                                        application.appliedDate
                                    ).toLocaleDateString()
                                    : "N/A"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= CHILD DETAILS ================= */}

                <div className="details-section">

                    <h2>
                        👶 Child Details
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Child Name
                            </label>

                            <p>
                                {application.childName}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Date of Birth
                            </label>

                            <p>
                                {application.childDob}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Gender
                            </label>

                            <p>
                                {application.gender}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Place of Birth
                            </label>

                            <p>
                                {application.placeOfBirth}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= PARENT DETAILS ================= */}

                <div className="details-section">

                    <h2>
                        👨‍👩‍👧 Parent Details
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Applicant Name
                            </label>

                            <p>
                                {application.applicantName}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Father Name
                            </label>

                            <p>
                                {application.fatherName}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Mother Name
                            </label>

                            <p>
                                {application.motherName}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= CONTACT DETAILS ================= */}

                <div className="details-section">

                    <h2>
                        📞 Contact Details
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Mobile
                            </label>

                            <p>
                                {application.mobile}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Email
                            </label>

                            <p>
                                {application.email || "N/A"}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= ADDRESS ================= */}

                <div className="details-section">

                    <h2>
                        📍 Address
                    </h2>


                    <div className="details-grid">

                        <div className="detail-item">

                            <label>
                                Village
                            </label>

                            <p>
                                {application.village}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Taluka
                            </label>

                            <p>
                                {application.taluka}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                District
                            </label>

                            <p>
                                {application.district}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                State
                            </label>

                            <p>
                                {application.state}
                            </p>

                        </div>


                        <div className="detail-item">

                            <label>
                                Pincode
                            </label>

                            <p>
                                {application.pincode}
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================= PURPOSE ================= */}

                <div className="details-section">

                    <h2>
                        📝 Purpose
                    </h2>

                    <div className="detail-item">

                        <p>
                            {application.purpose || "N/A"}
                        </p>

                    </div>

                </div>


                {/* ================= STATUS MESSAGE ================= */}

                {application.status === "APPROVED" && (

                    <div className="success-message">

                        <strong>
                            ✅ Application Approved
                        </strong>

                        <p>
                            Your Birth Certificate application
                            has been approved by the officer.
                        </p>

                    </div>

                )}


                {application.status === "REJECTED" && (

                    <div className="rejected-message">

                        <strong>
                            ❌ Application Rejected
                        </strong>

                        <p>
                            Your Birth Certificate application
                            has been rejected.
                        </p>

                    </div>

                )}


                {application.status === "PENDING" && (

                    <div className="pending-message">

                        <strong>
                            ⏳ Application Under Review
                        </strong>

                        <p>
                            Your Birth Certificate application
                            is currently being reviewed by
                            the officer.
                        </p>

                    </div>

                )}


                {/* ================= BUTTONS ================= */}

                <div className="details-actions">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/my-applications"
                            )
                        }
                    >
                        ← Back to Applications
                    </button>


                    {application.status === "APPROVED" && (

    <button
        className="download-btn"
        onClick={handleDownload}
    >
        📥 Download Certificate
    </button>

)}

                </div>


            </div>

        </div>

    );

}

export default ApplicationDetails;