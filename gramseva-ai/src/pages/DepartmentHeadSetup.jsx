import React, { useState } from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    FaUserTie,
    FaLock,
    FaUser,
    FaEnvelope,
    FaPhoneAlt,
    FaBuilding,
    FaEye,
    FaEyeSlash,
    FaArrowRight
} from "react-icons/fa";

import {
    createDepartmentHead
} from "../api/officerApi";

import "./DepartmentHeadSetup.css";


const DepartmentHeadSetup = () => {

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        officerId: "",
        password: "",
        fullName: "",
        email: "",
        mobile: "",
        department: ""

    });


    const [message, setMessage] =
        useState("");

    const [messageType, setMessageType] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));
    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setMessageType("");


        // =================================================
        // OFFICER ID VALIDATION
        // =================================================

        if (!formData.officerId.trim()) {

            setMessage(
                "Officer ID is required."
            );

            setMessageType("error");

            return;
        }


        // =================================================
        // PASSWORD VALIDATION
        // =================================================

        if (!formData.password.trim()) {

            setMessage(
                "Password is required."
            );

            setMessageType("error");

            return;
        }


        if (formData.password.length < 6) {

            setMessage(
                "Password must contain at least 6 characters."
            );

            setMessageType("error");

            return;
        }


        // =================================================
        // FULL NAME VALIDATION
        // =================================================

        if (!formData.fullName.trim()) {

            setMessage(
                "Full name is required."
            );

            setMessageType("error");

            return;
        }


        // =================================================
        // MOBILE VALIDATION
        // =================================================

        if (
            !/^\d{10}$/.test(
                formData.mobile.trim()
            )
        ) {

            setMessage(
                "Mobile number must contain exactly 10 digits."
            );

            setMessageType("error");

            return;
        }


        // =================================================
        // DEPARTMENT VALIDATION
        // =================================================

        if (!formData.department) {

            setMessage(
                "Please select a department."
            );

            setMessageType("error");

            return;
        }


        // =================================================
        // REQUEST DATA
        // =================================================

        const requestData = {

            officerId:
                formData.officerId.trim(),

            password:
                formData.password,

            fullName:
                formData.fullName.trim(),

            email:
                formData.email.trim() || null,

            mobile:
                formData.mobile.trim(),

            department:
                formData.department

        };


        console.log(
            "Department Head Request:",
            requestData
        );


        try {

            setLoading(true);


            const response =
                await createDepartmentHead(
                    requestData
                );


            console.log(
                "Department Head Response:",
                response.data
            );


            // =============================================
            // SUCCESS
            // =============================================

            if (response.data?.success) {

                setMessageType("success");

                setMessage(
                    response.data.message ||
                    "Department Head created successfully. Redirecting to Officer Login..."
                );


                // Clear the form

                setFormData({

                    officerId: "",
                    password: "",
                    fullName: "",
                    email: "",
                    mobile: "",
                    department: ""

                });


                // =========================================
                // REDIRECT TO OFFICER LOGIN
                // =========================================

                setTimeout(() => {

                    navigate("/officer/login");

                }, 1500);


            } else {

                setMessageType("error");

                setMessage(
                    response.data?.message ||
                    "Department Head creation failed."
                );
            }


        } catch (error) {

            console.error(
                "Create Department Head Error:",
                error
            );


            console.error(
                "Server Response:",
                error.response?.data
            );


            setMessageType("error");

            setMessage(

                error.response?.data?.message ||

                error.response?.data ||

                "Unable to create Department Head."

            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="department-setup-page">


            <div className="department-setup-background">

                <div className="background-circle circle-one"></div>

                <div className="background-circle circle-two"></div>

            </div>


            <div className="department-setup-container">


                {/* ===============================
                    HEADER
                =============================== */}

                <div className="department-setup-header">

                    <div className="department-logo">

                        <FaBuilding />

                    </div>


                    <div>

                        <p className="department-badge">

                            GramSeva AI

                        </p>


                        <h1>

                            Create Department Head

                        </h1>


                        <p>

                            Register and assign a new officer
                            to manage a Gram Panchayat department.

                        </p>

                    </div>

                </div>


                {/* ===============================
                    FORM CARD
                =============================== */}

                <div className="department-form-card">


                    <div className="form-card-heading">

                        <h2>

                            Officer Information

                        </h2>

                        <p>

                            Enter the details of the department administrator.

                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="department-form"
                    >


                        {/* OFFICER ID */}

                        <div className="form-group">

                            <label>

                                Officer ID

                            </label>


                            <div className="input-wrapper">

                                <FaUserTie className="input-icon" />


                                <input
                                    type="text"
                                    name="officerId"
                                    value={formData.officerId}
                                    onChange={handleChange}
                                    placeholder="e.g. OFF002"
                                    autoComplete="off"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="form-group">

                            <label>

                                Password

                            </label>


                            <div className="input-wrapper">

                                <FaLock className="input-icon" />


                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a secure password"
                                />


                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >

                                    {
                                        showPassword
                                            ? <FaEyeSlash />
                                            : <FaEye />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* FULL NAME */}

                        <div className="form-group">

                            <label>

                                Full Name

                            </label>


                            <div className="input-wrapper">

                                <FaUser className="input-icon" />


                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter officer full name"
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label>

                                Email Address

                                <span className="optional-label">

                                    Optional

                                </span>

                            </label>


                            <div className="input-wrapper">

                                <FaEnvelope className="input-icon" />


                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="officer@example.com"
                                />

                            </div>

                        </div>


                        {/* MOBILE */}

                        <div className="form-group">

                            <label>

                                Mobile Number

                            </label>


                            <div className="input-wrapper">

                                <FaPhoneAlt className="input-icon" />


                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter 10 digit mobile number"
                                    maxLength="10"
                                />

                            </div>

                        </div>


                        {/* DEPARTMENT */}

                        <div className="form-group full-width">

                            <label>

                                Department

                            </label>


                            <div className="input-wrapper">

                                <FaBuilding className="input-icon" />


                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                >

                                    <option value="">

                                        Select Department

                                    </option>

                                    <option value="WATER_SUPPLY">

                                        Water Supply

                                    </option>

                                    <option value="ELECTRICITY">

                                        Electricity

                                    </option>

                                    <option value="HEALTH">

                                        Health

                                    </option>

                                    <option value="SANITATION">

                                        Sanitation

                                    </option>

                                    <option value="ROADS">

                                        Roads

                                    </option>

                                    <option value="AGRICULTURE">

                                        Agriculture

                                    </option>

                                    <option value="EDUCATION">

                                        Education

                                    </option>

                                    <option value="REVENUE">

                                        Revenue

                                    </option>

                                    <option value="WOMEN_CHILD_WELFARE">

                                        Women & Child Welfare

                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* MESSAGE */}

                        {
                            message && (

                                <div
                                    className={
                                        `form-message ${messageType}`
                                    }
                                >

                                    <span>

                                        {
                                            messageType === "success"
                                                ? "✓"
                                                : "!"
                                        }

                                    </span>

                                    <p>

                                        {message}

                                    </p>

                                </div>

                            )
                        }


                        {/* SUBMIT BUTTON */}

                        <button
                            type="submit"
                            className="create-department-btn"
                            disabled={loading}
                        >

                            {
                                loading
                                    ? (
                                        <>

                                            <span className="button-spinner"></span>

                                            Creating Department Head...

                                        </>
                                    )
                                    : (
                                        <>

                                            Create Department Head

                                            <FaArrowRight />

                                        </>
                                    )
                            }

                        </button>


                    </form>


                    <div className="form-footer">

                        <span>

                            🔒 Secure department administration

                        </span>

                        <span className="footer-dot">

                            •

                        </span>

                        <span>

                            GramSeva AI

                        </span>

                    </div>


                </div>

            </div>

        </div>
    );
};


export default DepartmentHeadSetup;