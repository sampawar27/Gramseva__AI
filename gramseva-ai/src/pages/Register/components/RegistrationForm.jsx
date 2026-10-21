import { useState } from "react";
import api from "../../../api/api";

function RegistrationForm({
  registrationData,
  setRegistrationData,
  setStep,
}) {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  // =====================================================
  // VALIDATION
  // =====================================================

  const validate = () => {
    const newErrors = {};

    if (!registrationData.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    }

    if (!registrationData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        registrationData.email
      )
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!registrationData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (
      !/^\d{10}$/.test(registrationData.mobile)
    ) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    if (!registrationData.village) {
      newErrors.village = "Please select a village";
    }

    if (!registrationData.password) {
      newErrors.password = "Password is required";
    } else if (
      registrationData.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      registrationData.confirmPassword !==
      registrationData.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =====================================================
  // REGISTER USER
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // =================================================
      // DATA SENT TO SPRING BOOT
      // =================================================

      const registrationRequest = {
        aadhaarNumber: registrationData.aadhaar,

        fullName: registrationData.fullName,

        fatherName:
          registrationData.fatherName || "",

        dateOfBirth:
          registrationData.dateOfBirth || "2000-01-01",

        gender:
          registrationData.gender || "OTHER",

        mobile: registrationData.mobile,

        email: registrationData.email,

        village: registrationData.village,

        taluka:
          registrationData.taluka || "",

        district:
          registrationData.district || "",

        state:
          registrationData.state || "Maharashtra",

        pincode:
          registrationData.pincode || "",

        password: registrationData.password,
      };

      console.log(
        "Registration Request:",
        registrationRequest
      );

      // =================================================
      // CALL SPRING BOOT
      // =================================================

      const response = await api.post(
        "/auth/register",
        registrationRequest
      );

      console.log(
        "Registration Response:",
        response.data
      );

      // =================================================
      // CHECK BACKEND RESPONSE
      // =================================================

      if (response.data.success) {
        // Backend generates the REAL Village ID.
        // We extract it from the response message.

        const message = response.data.message || "";

        const villageIdMatch =
          message.match(
            /Village ID is\s+([A-Za-z0-9-]+)/
          );

        const villageId =
          villageIdMatch
            ? villageIdMatch[1]
            : "";

        // Save backend-generated Village ID
        setRegistrationData((prev) => ({
          ...prev,
          villageId: villageId,
        }));

        // Move to success page
        setStep(3);
      } else {
        setServerError(
          response.data.message ||
            "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Registration Error:",
        error
      );

      // =================================================
      // BACKEND ERROR
      // =================================================

      if (error.response) {
        setServerError(
          error.response.data?.message ||
            "Registration failed."
        );
      } else {
        setServerError(
          "Unable to connect to the server. Make sure Spring Boot is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="registration-form"
    >

      {/* =================================================
          FULL NAME
      ================================================= */}

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={registrationData.fullName}
        onChange={handleChange}
      />

      {errors.fullName && (
        <span className="error">
          {errors.fullName}
        </span>
      )}


      {/* =================================================
          EMAIL
      ================================================= */}

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={registrationData.email}
        onChange={handleChange}
      />

      {errors.email && (
        <span className="error">
          {errors.email}
        </span>
      )}


      {/* =================================================
          MOBILE
      ================================================= */}

      <input
        type="text"
        name="mobile"
        placeholder="Mobile Number"
        maxLength={10}
        value={registrationData.mobile}
        onChange={handleChange}
      />

      {errors.mobile && (
        <span className="error">
          {errors.mobile}
        </span>
      )}


      {/* =================================================
          VILLAGE
      ================================================= */}

      <select
        name="village"
        value={registrationData.village}
        onChange={handleChange}
      >

        <option value="">
          Select Village
        </option>

        <option value="Bidri">
          Bidri
        </option>

        <option value="Ichalkaranji">
          Ichalkaranji
        </option>

        <option value="Gargoti">
          Gargoti
        </option>

        <option value="Kolhapur">
          Kolhapur
        </option>

        <option value="Sangli">
          Sangli
        </option>

      </select>

      {errors.village && (
        <span className="error">
          {errors.village}
        </span>
      )}


      {/* =================================================
          PASSWORD
      ================================================= */}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={registrationData.password}
        onChange={handleChange}
      />

      {errors.password && (
        <span className="error">
          {errors.password}
        </span>
      )}


      {/* =================================================
          CONFIRM PASSWORD
      ================================================= */}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={registrationData.confirmPassword}
        onChange={handleChange}
      />

      {errors.confirmPassword && (
        <span className="error">
          {errors.confirmPassword}
        </span>
      )}


      {/* =================================================
          SERVER ERROR
      ================================================= */}

      {serverError && (
        <div className="server-error">
          ❌ {serverError}
        </div>
      )}


      {/* =================================================
          BUTTONS
      ================================================= */}

      <div className="form-buttons">

        <button
          type="button"
          className="back-btn"
          onClick={() => setStep(1)}
          disabled={loading}
        >
          Back
        </button>


        <button
          type="submit"
          className="next-btn"
          disabled={loading}
        >

          {loading
            ? "Creating Account..."
            : "Register"}

        </button>

      </div>

    </form>
  );
}

export default RegistrationForm;