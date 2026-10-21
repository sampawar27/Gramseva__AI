import "./ComplaintForm.css";

import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    createComplaint
} from "../../api/complaintApi";


function ComplaintForm() {

    const navigate =
        useNavigate();


    // =====================================================
    // GET LOGGED USER
    // =====================================================

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );


    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({

        villageId:
            user?.villageId || "",

        citizenName:
            user?.fullName || "",

        mobile:
            user?.mobile || "",

        email:
            user?.email || "",

        subject:
            "",

        description:
            "",

        location:
            "",

        category:
            "",

        priority:
            "MEDIUM"

    });


    // =====================================================
    // STATES
    // =====================================================

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({

            ...formData,

            [name]: value

        });

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        setError("");

        setSuccess("");


        // =================================================
        // BASIC VALIDATION
        // =================================================

        if (!formData.villageId) {

            setError(
                "Village ID is missing. Please login again."
            );

            return;

        }


        if (!formData.subject.trim()) {

            setError(
                "Please enter complaint subject."
            );

            return;

        }


        if (!formData.description.trim()) {

            setError(
                "Please describe your problem."
            );

            return;

        }


        if (!formData.location.trim()) {

            setError(
                "Please enter complaint location."
            );

            return;

        }


        if (!formData.category) {

            setError(
                "Please select complaint category."
            );

            return;

        }


        try {

            setLoading(true);


            // =============================================
            // SEND TO BACKEND
            // =============================================

            const response =
                await createComplaint(
                    formData
                );


            console.log(
                "Complaint Created:",
                response.data
            );


            // =============================================
            // SUCCESS
            // =============================================

            const complaintNumber =
                response.data?.complaintNumber;


            setSuccess(
                complaintNumber
                    ? `Complaint submitted successfully! Complaint Number: ${complaintNumber}`
                    : "Complaint submitted successfully!"
            );


            // =============================================
            // CLEAR FORM
            // =============================================

            setFormData({

                villageId:
                    user?.villageId || "",

                citizenName:
                    user?.fullName || "",

                mobile:
                    user?.mobile || "",

                email:
                    user?.email || "",

                subject:
                    "",

                description:
                    "",

                location:
                    "",

                category:
                    "",

                priority:
                    "MEDIUM"

            });


            // =============================================
            // GO TO COMPLAINTS
            // =============================================

            setTimeout(() => {

                navigate(
                    "/citizen/complaints"
                );

            }, 2000);


        } catch (err) {

            console.error(
                "Complaint submission error:",
                err
            );


            // =============================================
            // ERROR MESSAGE
            // =============================================

            if (
                err.response?.data
            ) {

                if (
                    typeof err.response.data ===
                    "string"
                ) {

                    setError(
                        err.response.data
                    );

                } else {

                    setError(
                        err.response.data.message ||
                        "Failed to submit complaint."
                    );

                }

            } else {

                setError(
                    "Unable to connect to server. Please make sure the backend is running."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <div className="complaint-form-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="complaint-form-header">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate(
                            "/citizen/dashboard"
                        )
                    }
                >
                    ← Back to Dashboard
                </button>


                <h1>
                    🚨 Report a Problem
                </h1>


                <p>
                    Submit your complaint and
                    let GramSeva AI classify it
                    automatically.
                </p>

            </div>



            {/* =================================================
                FORM CARD
            ================================================= */}

            <div className="complaint-form-card">


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="complaint-error">

                        ❌ {error}

                    </div>

                )}



                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (

                    <div className="complaint-success">

                        ✅ {success}

                    </div>

                )}



                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* =============================================
                        CITIZEN INFORMATION
                    ============================================== */}

                    <h2>
                        👤 Citizen Information
                    </h2>


                    <div className="form-grid">


                        <div className="form-group">

                            <label>
                                Village ID
                            </label>

                            <input
                                type="text"
                                name="villageId"
                                value={
                                    formData.villageId
                                }
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Citizen Name
                            </label>

                            <input
                                type="text"
                                name="citizenName"
                                value={
                                    formData.citizenName
                                }
                                readOnly
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Mobile
                            </label>

                            <input
                                type="text"
                                name="mobile"
                                value={
                                    formData.mobile
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter mobile number"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter email"
                            />

                        </div>

                    </div>



                    {/* =============================================
                        COMPLAINT INFORMATION
                    ============================================== */}

                    <h2>
                        📝 Complaint Information
                    </h2>


                    <div className="form-group">

                        <label>
                            Complaint Subject *
                        </label>

                        <input
                            type="text"
                            name="subject"
                            value={
                                formData.subject
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Example: No water supply"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description *
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Describe your problem in detail..."
                            rows="6"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Location *
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={
                                formData.location
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Example: Main Road, Ward 3"
                            required
                        />

                    </div>



                    {/* =============================================
                        CATEGORY + PRIORITY
                    ============================================== */}

                    <div className="form-grid">


                        <div className="form-group">

                            <label>
                                Complaint Category *
                            </label>

                            <select
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            >

                                <option value="">
                                    Select Category
                                </option>

                                <option value="WATER">
                                    💧 Water
                                </option>

                                <option value="ROAD">
                                    🛣️ Road
                                </option>

                                <option value="ELECTRICITY">
                                    ⚡ Electricity
                                </option>

                                <option value="SANITATION">
                                    🗑️ Sanitation
                                </option>

                                <option value="HEALTH">
                                    🏥 Health
                                </option>

                                <option value="AGRICULTURE">
                                    🌾 Agriculture
                                </option>

                                <option value="OTHER">
                                    📌 Other
                                </option>

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={
                                    formData.priority
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="LOW">
                                    🟢 Low
                                </option>

                                <option value="MEDIUM">
                                    🟡 Medium
                                </option>

                                <option value="HIGH">
                                    🔴 High
                                </option>

                            </select>

                        </div>

                    </div>



                    {/* =============================================
                        AI INFORMATION
                    ============================================== */}

                    <div className="ai-info-box">

                        <h3>
                            🤖 GramSeva AI Verification
                        </h3>

                        <p>
                            Your complaint will be
                            automatically analyzed by
                            GramSeva AI to determine
                            its category, priority and
                            responsible department.
                        </p>

                    </div>



                    {/* =============================================
                        BUTTONS
                    ============================================== */}

                    <div className="form-buttons">


                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/citizen/dashboard"
                                )
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "⏳ Submitting..."
                                : "🚨 Submit Complaint"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default ComplaintForm;