import "./ChangePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../api/api";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        if (
            !formData.currentPassword ||
            !formData.newPassword ||
            !formData.confirmPassword
        ) {

            setError("Please fill all fields.");

            return;
        }

        if (formData.newPassword !== formData.confirmPassword) {

            setError("New password and confirm password do not match.");

            return;
        }

        if (formData.newPassword.length < 6) {

            setError("New password must contain at least 6 characters.");

            return;
        }

        try {

            const loggedUser =
                JSON.parse(localStorage.getItem("user"));

            if (!loggedUser || !loggedUser.villageId) {

                setError("User session not found. Please login again.");

                return;
            }

            const response = await changePassword(
                loggedUser.villageId,
                {
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                }
            );

            if (response.data.success) {

                setMessage(
                    "Password changed successfully."
                );

                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });

            } else {

                setError(
                    response.data.message ||
                    "Unable to change password."
                );

            }

        }
        catch (error) {

            console.log(error);

            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        }

    };

    return (

        <div className="change-password-container">

            <div className="change-password-card">

                <h1>🔐 Change Password</h1>

                <p className="password-info">
                    Update your account password securely.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="password-field">

                        <label>
                            Current Password
                        </label>

                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Enter current password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="password-field">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="password-field">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                    </div>

                    {error && (

                        <div className="error-message">
                            {error}
                        </div>

                    )}

                    {message && (

                        <div className="success-message">
                            {message}
                        </div>

                    )}

                    <button
                        type="submit"
                        className="change-password-btn"
                    >
                        Change Password
                    </button>

                    <button
                        type="button"
                        className="back-btn"
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </button>

                </form>

            </div>

        </div>

    );

}

export default ChangePassword;