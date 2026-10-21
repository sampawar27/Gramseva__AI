import "./SubmitComplaint.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SubmitComplaint() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({

        subject: "",
        description: "",
        location: "",
        category: "",
        priority: ""

    });


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({

            ...formData,

            [name]: value

        });

    };


    const handleSubmit = (event) => {

        event.preventDefault();

        console.log(
            "Complaint:",
            formData
        );

        alert(
            "Complaint form submitted successfully!"
        );

    };


    return (

        <div className="submit-complaint-page">

            <div className="submit-complaint-container">

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/citizen/complaints")
                    }
                >
                    ← Back to Complaints
                </button>


                <div className="submit-complaint-card">

                    <div className="form-header">

                        <h1>
                            📢 Submit Complaint
                        </h1>

                        <p>
                            Describe your issue clearly.
                            GramSeva AI will analyze and
                            route your complaint.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                    >

                        {/* SUBJECT */}

                        <div className="form-group">

                            <label>
                                Complaint Subject
                            </label>

                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Enter complaint subject"
                                required
                            />

                        </div>


                        {/* DESCRIPTION */}

                        <div className="form-group">

                            <label>
                                Complaint Description
                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your complaint in detail..."
                                rows="6"
                                required
                            />

                        </div>


                        {/* LOCATION */}

                        <div className="form-group">

                            <label>
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter complaint location"
                                required
                            />

                        </div>


                        {/* CATEGORY */}

                        <div className="form-group">

                            <label>
                                Complaint Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select category
                                </option>

                                <option value="WATER">
                                    💧 Water Supply
                                </option>

                                <option value="ROAD">
                                    🛣️ Roads
                                </option>

                                <option value="ELECTRICITY">
                                    ⚡ Electricity
                                </option>

                                <option value="SANITATION">
                                    🗑️ Sanitation
                                </option>

                                <option value="STREET_LIGHT">
                                    💡 Street Lights
                                </option>

                                <option value="DRAINAGE">
                                    🌧️ Drainage
                                </option>

                                <option value="OTHER">
                                    📌 Other
                                </option>

                            </select>

                        </div>


                        {/* PRIORITY */}

                        <div className="form-group">

                            <label>
                                Priority
                            </label>

                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select priority
                                </option>

                                <option value="LOW">
                                    Low
                                </option>

                                <option value="MEDIUM">
                                    Medium
                                </option>

                                <option value="HIGH">
                                    High
                                </option>

                                <option value="URGENT">
                                    Urgent
                                </option>

                            </select>

                        </div>


                        {/* AI INFORMATION */}

                        <div className="ai-info-box">

                            <span>
                                🤖
                            </span>

                            <div>

                                <strong>
                                    AI Verification
                                </strong>

                                <p>
                                    GramSeva AI will automatically
                                    analyze your complaint, identify
                                    its category and priority, and
                                    route it to the appropriate
                                    department.
                                </p>

                            </div>

                        </div>


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            🚀 Submit Complaint
                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}

export default SubmitComplaint;