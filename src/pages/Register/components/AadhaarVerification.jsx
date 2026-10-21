import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/api";

function AadhaarVerification({
  registrationData,
  setRegistrationData,
  setStep,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setRegistrationData((prev) => ({
      ...prev,
      aadhaar: value,
    }));

    setError("");
  };

  const handleVerify = async () => {

    if (registrationData.aadhaar.length !== 12) {

      setError(
        "Aadhaar number must contain exactly 12 digits."
      );

      return;
    }

    setLoading(true);
    setError("");

    try {

      /*
       * Check Aadhaar directly in the database.
       *
       * We are NOT using fake users anymore.
       */

      const response = await api.get(
        `/user/check-aadhaar/${registrationData.aadhaar}`
      );

      if (response.data.exists) {

        setError(
          "This Aadhaar number is already registered. Please login."
        );

        setLoading(false);

        return;
      }

      // Aadhaar is not registered.
      // Continue to registration form.

      setLoading(false);

      setStep(2);

    } catch (error) {

      console.error(
        "Aadhaar verification error:",
        error
      );

      setLoading(false);

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Unable to verify Aadhaar."
        );

      } else {

        setError(
          "Unable to connect to the server. Make sure Spring Boot is running."
        );

      }

    }
  };

  return (
    <div className="aadhaar-card">

      <h2>Aadhaar Verification</h2>

      <p>
        Enter your 12-digit Aadhaar number to continue.
      </p>

      <input
        type="text"
        maxLength={12}
        placeholder="Enter Aadhaar Number"
        value={registrationData.aadhaar}
        onChange={handleChange}
        className="aadhaar-input"
      />

      {error && (
        <p className="aadhaar-error">
          {error}
        </p>
      )}

      <button
        className="verify-btn"
        onClick={handleVerify}
        disabled={loading}
      >

        {loading
          ? "Verifying..."
          : "Verify Aadhaar"}

      </button>

      <div className="login-now">

        Already Registered?

        <Link to="/login">
          Login
        </Link>

      </div>

    </div>
  );
}

export default AadhaarVerification;