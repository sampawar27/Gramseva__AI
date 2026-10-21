import "./OfficerLogin.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { officerLogin } from "../api/officerApi";


function OfficerLogin() {

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        officerId: "",
        password: ""
    });


    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));


        setError("");

    };


    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");


        // =================================================
        // VALIDATION
        // =================================================

        if (!formData.officerId.trim()) {

            setError(
                "Officer ID is required."
            );

            return;
        }


        if (!formData.password.trim()) {

            setError(
                "Password is required."
            );

            return;
        }


        setLoading(true);


        try {

            const response =
                await officerLogin({
                    officerId:
                        formData.officerId.trim(),

                    password:
                        formData.password
                });


            const data =
                response.data;


            // =================================================
            // LOGIN FAILED
            // =================================================

            if (!data.success) {

                setError(
                    data.message ||
                    "Invalid Officer ID or password."
                );

                return;
            }


            // =================================================
            // SAVE OFFICER DETAILS
            // =================================================

            localStorage.setItem(
                "officer",
                JSON.stringify({

                    id:
                        data.id,

                    officerId:
                        data.officerId,

                    fullName:
                        data.fullName,

                    email:
                        data.email,

                    mobile:
                        data.mobile,

                    role:
                        data.role,

                    status:
                        data.status,

                    department:
                        data.department

                })
            );


            // =================================================
            // SAVE JWT TOKEN
            // =================================================

            if (data.token) {

                localStorage.setItem(
                    "officerToken",
                    data.token
                );

            }


            // =================================================
            // GO TO OFFICER DASHBOARD
            // KEEPING YOUR EXISTING ROUTE
            // =================================================

            navigate(
                "/officer/dashboard"
            );

        }
        catch (error) {

            console.error(
                "Officer login error:",
                error
            );


            if (error.response) {

                setError(

                    error.response.data?.message ||

                    "Officer login failed."

                );

            }
            else {

                setError(
                    "Unable to connect to server."
                );

            }

        }
        finally {

            setLoading(false);

        }

    };


    // =====================================================
    // GO TO DEPARTMENT ADMIN REGISTRATION
    // =====================================================

    const handleCreateAccount = () => {

        navigate(
            "/department-head-setup"
        );

    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <div className="officer-login-page">

            <div className="officer-login-card">


                {/* ===============================
                    HEADER
                =============================== */}

                <div className="officer-icon">

                    👨‍💼

                </div>


                <h1>

                    Officer Login

                </h1>


                <p>

                    GramSeva AI Administration

                </p>


                {/* ===============================
                    LOGIN FORM
                =============================== */}

                <form
                    onSubmit={handleLogin}
                >


                    {/* OFFICER ID */}

                    <div className="form-group">

                        <label>

                            Officer ID

                        </label>


                        <input
                            type="text"
                            name="officerId"
                            placeholder="Enter Officer ID"
                            value={formData.officerId}
                            onChange={handleChange}
                            autoComplete="username"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>

                            Password

                        </label>


                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                    </div>


                    {/* ERROR MESSAGE */}

                    {

                        error && (

                            <div className="login-error">

                                {error}

                            </div>

                        )

                    }


                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading
                                ? "Logging in..."
                                : "Login"

                        }

                    </button>


                    {/* ===============================
                        CREATE DEPARTMENT ADMIN
                    =============================== */}

                    <div className="officer-register-section">

                        <p>

                            Don't have a department administrator account?

                        </p>


                        <button
                            type="button"
                            className="create-account-btn"
                            onClick={
                                handleCreateAccount
                            }
                        >

                            + Create New Account

                        </button>

                    </div>


                </form>

            </div>

        </div>

    );

}


export default OfficerLogin;