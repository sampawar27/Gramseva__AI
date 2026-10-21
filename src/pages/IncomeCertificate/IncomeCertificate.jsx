import "./IncomeCertificate.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { applyIncomeCertificate } from "../../api/api";

function IncomeCertificate() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        applicantName: "",
        fatherName: "",
        dateOfBirth: "",
        gender: "",
        mobile: "",
        email: "",
        occupation: "",
        annualIncome: "",
        incomeSource: "",
        village: "",
        taluka: "",
        district: "",
        state: "Maharashtra",
        pincode: "",
        purpose: ""
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        try {

            setLoading(true);

            const user =
                JSON.parse(
                    localStorage.getItem("user")
                );

            const villageId =
                user?.villageId || "V001";


            const requestData = {

                villageId: villageId,

                applicantName:
                    formData.applicantName,

                fatherName:
                    formData.fatherName,

                dateOfBirth:
                    formData.dateOfBirth,

                gender:
                    formData.gender,

                mobile:
                    formData.mobile,

                email:
                    formData.email,

                occupation:
                    formData.occupation,

                annualIncome:
                    Number(formData.annualIncome),

                incomeSource:
                    formData.incomeSource,

                village:
                    formData.village,

                taluka:
                    formData.taluka,

                district:
                    formData.district,

                state:
                    formData.state,

                pincode:
                    formData.pincode,

                purpose:
                    formData.purpose

            };


            const response =
                await applyIncomeCertificate(
                    requestData
                );


            setMessage(
                response.data.message ||
                "Income Certificate application submitted successfully."
            );


            setFormData({
                applicantName: "",
                fatherName: "",
                dateOfBirth: "",
                gender: "",
                mobile: "",
                email: "",
                occupation: "",
                annualIncome: "",
                incomeSource: "",
                village: "",
                taluka: "",
                district: "",
                state: "Maharashtra",
                pincode: "",
                purpose: ""
            });

        }
        catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to submit Income Certificate application."
            );

        }
        finally {

            setLoading(false);

        }

    };


    return (

        <div className="income-certificate-page">

            <div className="income-certificate-card">

                {/* HEADER */}

                <div className="income-form-header">

                    <div>

                        <h1>
                            💰 Income Certificate
                        </h1>

                        <p>
                            Apply for your Income Certificate
                            through GramSeva AI.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() =>
                            navigate(
                                "/citizen/apply-certificate"
                            )
                        }
                    >
                        ← Back
                    </button>

                </div>


                {/* SUCCESS MESSAGE */}

                {message && (

                    <div className="success-message">

                        ✅ {message}

                    </div>

                )}


                {/* ERROR MESSAGE */}

                {error && (

                    <div className="error-message">

                        ❌ {error}

                    </div>

                )}


                {/* FORM */}

                <form
                    className="income-form"
                    onSubmit={handleSubmit}
                >

                    {/* PERSONAL INFORMATION */}

                    <div className="form-section">

                        <h2>
                            👤 Personal Information
                        </h2>


                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Applicant Name *
                                </label>

                                <input
                                    type="text"
                                    name="applicantName"
                                    value={
                                        formData.applicantName
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter applicant name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Father Name *
                                </label>

                                <input
                                    type="text"
                                    name="fatherName"
                                    value={
                                        formData.fatherName
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter father's name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Date of Birth *
                                </label>

                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={
                                        formData.dateOfBirth
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Gender *
                                </label>

                                <select
                                    name="gender"
                                    value={
                                        formData.gender
                                    }
                                    onChange={handleChange}
                                    required
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                    <option value="Other">
                                        Other
                                    </option>

                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Mobile Number *
                                </label>

                                <input
                                    type="tel"
                                    name="mobile"
                                    value={
                                        formData.mobile
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter 10-digit mobile number"
                                    maxLength="10"
                                    required
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
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                />

                            </div>

                        </div>

                    </div>


                    {/* INCOME INFORMATION */}

                    <div className="form-section">

                        <h2>
                            💰 Income Information
                        </h2>


                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Occupation *
                                </label>

                                <input
                                    type="text"
                                    name="occupation"
                                    value={
                                        formData.occupation
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter occupation"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Annual Income (₹) *
                                </label>

                                <input
                                    type="number"
                                    name="annualIncome"
                                    value={
                                        formData.annualIncome
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter annual income"
                                    min="0"
                                    required
                                />

                            </div>


                            <div className="form-group full-width">

                                <label>
                                    Source of Income *
                                </label>

                                <input
                                    type="text"
                                    name="incomeSource"
                                    value={
                                        formData.incomeSource
                                    }
                                    onChange={handleChange}
                                    placeholder="e.g. Salary, Business, Agriculture"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* ADDRESS INFORMATION */}

                    <div className="form-section">

                        <h2>
                            📍 Address Information
                        </h2>


                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Village *
                                </label>

                                <input
                                    type="text"
                                    name="village"
                                    value={
                                        formData.village
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter village"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Taluka *
                                </label>

                                <input
                                    type="text"
                                    name="taluka"
                                    value={
                                        formData.taluka
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter taluka"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    District *
                                </label>

                                <input
                                    type="text"
                                    name="district"
                                    value={
                                        formData.district
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter district"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    State *
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={
                                        formData.state
                                    }
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Pincode *
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={
                                        formData.pincode
                                    }
                                    onChange={handleChange}
                                    placeholder="Enter 6-digit pincode"
                                    maxLength="6"
                                    required
                                />

                            </div>

                        </div>

                    </div>


                    {/* PURPOSE */}

                    <div className="form-section">

                        <h2>
                            📝 Certificate Purpose
                        </h2>


                        <div className="form-group full-width">

                            <label>
                                Purpose *
                            </label>

                            <textarea
                                name="purpose"
                                value={
                                    formData.purpose
                                }
                                onChange={handleChange}
                                placeholder="Enter the purpose for which the Income Certificate is required"
                                rows="4"
                                required
                            />

                        </div>

                    </div>


                    {/* SUBMIT */}

                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate(
                                    "/citizen/apply-certificate"
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
                                ? "Submitting..."
                                : "Submit Application →"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default IncomeCertificate;