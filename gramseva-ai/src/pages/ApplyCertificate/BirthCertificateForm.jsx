import "./BirthCertificateForm.css";
import { useState } from "react";
import { applyBirthCertificate } from "../../api/api";

function BirthCertificateForm() {

    const [formData, setFormData] = useState({
        villageId: "",
        applicantName: "",
        childName: "",
        fatherName: "",
        motherName: "",
        childDob: "",
        gender: "",
        placeOfBirth: "",
        mobile: "",
        email: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
        purpose: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            setMessage("");

            const user = JSON.parse(localStorage.getItem("user"));

            const requestData = {
                ...formData,
                villageId: user.villageId
            };

            const response = await applyBirthCertificate(requestData);

            setSuccess(true);
            setMessage(response.data.message);

            setFormData({
                villageId: "",
                applicantName: "",
                childName: "",
                fatherName: "",
                motherName: "",
                childDob: "",
                gender: "",
                placeOfBirth: "",
                mobile: "",
                email: "",
                village: "",
                taluka: "",
                district: "",
                state: "",
                pincode: "",
                purpose: ""
            });

        }
        catch (error) {

            setSuccess(false);

            if (error.response) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Unable to connect to server.");
            }

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <div className="form-container">

            <h1>Birth Certificate Application</h1>

            <form onSubmit={handleSubmit}>

                <h2>Applicant Details</h2>

                <input
                    type="text"
                    name="applicantName"
                    placeholder="Applicant Name"
                    value={formData.applicantName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="childName"
                    placeholder="Child Name"
                    value={formData.childName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="fatherName"
                    placeholder="Father Name"
                    value={formData.fatherName}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="motherName"
                    placeholder="Mother Name"
                    value={formData.motherName}
                    onChange={handleChange}
                />

                <h2>Child Details</h2>

                <input
                    type="date"
                    name="childDob"
                    value={formData.childDob}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="text"
                    name="placeOfBirth"
                    placeholder="Place of Birth"
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                />

                <h2>Contact Details</h2>

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <h2>Address</h2>

                <input
                    type="text"
                    name="village"
                    placeholder="Village"
                    value={formData.village}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="taluka"
                    placeholder="Taluka"
                    value={formData.taluka}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                />

                <h2>Purpose</h2>

                <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                >
                    <option value="">Select Purpose</option>
                    <option value="School Admission">School Admission</option>
                    <option value="Passport">Passport</option>
                    <option value="Government Scheme">Government Scheme</option>
                    <option value="Other">Other</option>
                </select>

                {message && (
                    <p
                        style={{
                            color: success ? "green" : "red",
                            fontWeight: "bold",
                            marginTop: "20px"
                        }}
                    >
                        {message}
                    </p>
                )}

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Application"}
                </button>

            </form>

        </div>

    );

}

export default BirthCertificateForm;