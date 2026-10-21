import "./MyApplications.css";

import { useEffect, useState } from "react";

import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import {
    getMyApplications,
    getMyIncomeApplications,
    downloadBirthCertificate
} from "../../api/api";


function MyApplications() {

    const navigate = useNavigate();

    const [searchParams, setSearchParams] =
        useSearchParams();

    const [applications, setApplications] =
        useState([]);

    const [searchText, setSearchText] =
        useState("");


    const [statusFilter, setStatusFilter] =
        useState(
            searchParams.get("status") || "ALL"
        );


    const [certificateFilter, setCertificateFilter] =
        useState(
            searchParams.get("certificate") || "ALL"
        );


    /* ============================
       LOAD APPLICATIONS
       ============================ */

    useEffect(() => {

        loadApplications();

    }, []);


    const loadApplications = async () => {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );


            const villageId =
                user?.villageId || "V001";


            // ============================
            // BIRTH CERTIFICATE
            // ============================

            const birthResponse =
                await getMyApplications(
                    villageId
                );


            // ============================
            // INCOME CERTIFICATE
            // ============================

            const incomeResponse =
                await getMyIncomeApplications(
                    villageId
                );


            const birthApplications =
                birthResponse.data || [];


            const incomeApplications =
                incomeResponse.data || [];


            // ============================
            // COMBINE APPLICATIONS
            // ============================

            const allApplications = [

                ...birthApplications,

                ...incomeApplications

            ];


            console.log(
                "Birth Applications:",
                birthApplications
            );


            console.log(
                "Income Applications:",
                incomeApplications
            );


            console.log(
                "All Applications:",
                allApplications
            );


            setApplications(
                allApplications
            );


        } catch (error) {

            console.log(
                "Error loading applications:",
                error
            );

        }

    };


    /* ============================
       DOWNLOAD BIRTH CERTIFICATE
       ============================ */

    const handleDownload = async (id) => {

        try {

            console.log(
                "Downloading Certificate ID:",
                id
            );


            const response =
                await downloadBirthCertificate(
                    id
                );


            const blob =
                new Blob(
                    [response.data],
                    {
                        type: "application/pdf"
                    }
                );


            const url =
                window.URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement("a");


            link.href = url;


            link.download =
                "BirthCertificate.pdf";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            window.URL.revokeObjectURL(
                url
            );


        } catch (error) {

            console.log(
                "Download error:",
                error
            );


            alert(
                "Unable to download certificate."
            );

        }

    };


    /* ============================
       SEARCH + FILTER
       ============================ */

    const filteredApplications =
        applications.filter((app) => {

            const search =
                searchText
                    .toLowerCase()
                    .trim();


            const applicationNumber =
                app.applicationNumber
                    ?.toLowerCase() || "";


            const certificateType =
                app.certificateType
                    ?.toLowerCase() || "";


            const status =
                app.status
                    ?.toUpperCase() || "";


            const matchesSearch =
                applicationNumber.includes(
                    search
                );


            const matchesStatus =
                statusFilter === "ALL" ||
                status === statusFilter;


            const matchesCertificate =
                certificateFilter === "ALL" ||
                certificateType ===
                    certificateFilter.toLowerCase();


            return (
                matchesSearch &&
                matchesStatus &&
                matchesCertificate
            );

        });


    /* ============================
       RESET FILTERS
       ============================ */

    const handleReset = () => {

        setSearchText("");

        setStatusFilter("ALL");

        setCertificateFilter("ALL");

        setSearchParams({});

    };


    /* ============================
       VIEW APPLICATION DETAILS
       ============================ */

    const handleViewDetails = (app) => {

        if (
            app.certificateType ===
            "Income Certificate"
        ) {

            navigate(
                `/citizen/my-applications/income/${app.id}`
            );

        } else {

            navigate(
                `/citizen/my-applications/${app.id}`
            );

        }

    };


    /* ============================
       RENDER
       ============================ */

    return (

        <div className="applications-container">


            <h1>
                📄 My Applications
            </h1>


            {/* ============================
                SEARCH + FILTER
               ============================ */}

            <div className="filter-section">


                <input
                    type="text"
                    placeholder="🔍 Search Application Number"
                    className="search-box"
                    value={searchText}
                    onChange={(e) =>
                        setSearchText(
                            e.target.value
                        )
                    }
                />


                {/* STATUS FILTER */}

                <select
                    value={statusFilter}
                    onChange={(e) => {

                        const value =
                            e.target.value;


                        setStatusFilter(
                            value
                        );


                        const certificate =
                            searchParams.get(
                                "certificate"
                            );


                        const params = {};


                        if (
                            value !== "ALL"
                        ) {

                            params.status =
                                value;

                        }


                        if (
                            certificate
                        ) {

                            params.certificate =
                                certificate;

                        }


                        setSearchParams(
                            params
                        );

                    }}
                >

                    <option value="ALL">
                        All Status
                    </option>


                    <option value="PENDING">
                        Pending
                    </option>


                    <option value="APPROVED">
                        Approved
                    </option>


                    <option value="REJECTED">
                        Rejected
                    </option>

                </select>


                {/* CERTIFICATE FILTER */}

                <select
                    className="filter-select"
                    value={certificateFilter}
                    onChange={(e) => {

                        const value =
                            e.target.value;


                        setCertificateFilter(
                            value
                        );


                        const status =
                            searchParams.get(
                                "status"
                            );


                        const params = {};


                        if (status) {

                            params.status =
                                status;

                        }


                        if (
                            value !== "ALL"
                        ) {

                            params.certificate =
                                value;

                        }


                        setSearchParams(
                            params
                        );

                    }}
                >

                    <option value="ALL">
                        All Certificates
                    </option>


                    <option value="Birth Certificate">
                        Birth Certificate
                    </option>


                    <option value="Income Certificate">
                        Income Certificate
                    </option>


                    <option value="Residence Certificate">
                        Residence Certificate
                    </option>

                </select>


                {/* RESET */}

                <button
                    className="reset-btn"
                    onClick={handleReset}
                >
                    🔄 Reset
                </button>

            </div>


            {/* ============================
                RESULT COUNT
               ============================ */}

            <div className="result-count">

                Showing{" "}

                <strong>
                    {
                        filteredApplications.length
                    }
                </strong>{" "}

                of{" "}

                <strong>
                    {
                        applications.length
                    }
                </strong>{" "}

                applications

            </div>


            {/* ============================
                APPLICATION TABLE
               ============================ */}

            <table>


                <thead>

                    <tr>

                        <th>
                            Application No
                        </th>


                        <th>
                            Certificate
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


                    {filteredApplications.length === 0 ? (

                        <tr>

                            <td
                                colSpan="5"
                                className="no-results"
                            >
                                🔍 No applications found
                            </td>

                        </tr>

                    ) : (


                        filteredApplications.map(
                            (app) => (

                                <tr
                                    key={
                                        app.id ||
                                        app.applicationNumber
                                    }
                                >


                                    {/* APPLICATION NUMBER */}

                                    <td>

                                        {
                                            app.applicationNumber
                                        }

                                    </td>


                                    {/* CERTIFICATE TYPE */}

                                    <td>

                                        {
                                            app.certificateType
                                        }

                                    </td>


                                    {/* STATUS */}

                                    <td>

                                        <span
                                            className={
                                                app.status ===
                                                "APPROVED"
                                                    ? "approved"
                                                    : app.status ===
                                                      "REJECTED"
                                                    ? "rejected"
                                                    : "pending"
                                            }
                                        >

                                            {
                                                app.status
                                            }

                                        </span>

                                    </td>


                                    {/* DATE */}

                                    <td>

                                        {
                                            app.appliedDate
                                        }

                                    </td>


                                    {/* ACTION */}

                                    <td>


                                        {/* VIEW DETAILS */}

                                        <button
                                            className="view-details-btn"
                                            onClick={() =>
                                                handleViewDetails(
                                                    app
                                                )
                                            }
                                        >
                                            👁 View Details
                                        </button>


                                        {/* DOWNLOAD BIRTH CERTIFICATE */}

                                        {app.status ===
                                            "APPROVED" &&
                                            app.certificateType ===
                                                "Birth Certificate" && (

                                                <button
                                                    className="download-btn"
                                                    onClick={() =>
                                                        handleDownload(
                                                            app.id
                                                        )
                                                    }
                                                >
                                                    📥 Download
                                                </button>

                                            )}


                                        {/* INCOME APPROVED */}

                                        {app.status ===
                                            "APPROVED" &&
                                            app.certificateType ===
                                                "Income Certificate" && (

                                                <span className="waiting">
                                                    ✅ Approved
                                                </span>

                                            )}


                                        {/* PENDING */}

                                        {app.status ===
                                            "PENDING" && (

                                            <span className="waiting">

                                                ⏳ Waiting for Approval

                                            </span>

                                        )}


                                        {/* REJECTED */}

                                        {app.status ===
                                            "REJECTED" && (

                                            <span className="rejected-text">

                                                ❌ Application Rejected

                                            </span>

                                        )}

                                    </td>

                                </tr>

                            )
                        )

                    )}

                </tbody>

            </table>

        </div>

    );

}


export default MyApplications;