import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function ResetPassword({
  forgotData,
  setForgotData,
  setStep,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForgotData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!forgotData.password) {
      newErrors.password = "Password is required";
    } else if (forgotData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    if (!forgotData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm Password is required";
    } else if (
      forgotData.password !== forgotData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleReset = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  return (
    <form
      className="reset-form"
      onSubmit={handleReset}
    >
      <h2>Create New Password</h2>

      <div className="password-box">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="New Password"
          value={forgotData.password}
          onChange={handleChange}
        />

        <span
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </span>
      </div>

      {errors.password && (
        <p className="otp-error">
          {errors.password}
        </p>
      )}

      <div className="password-box">
        <input
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          name="confirmPassword"
          placeholder="Confirm Password"
          value={forgotData.confirmPassword}
          onChange={handleChange}
        />

        <span
          onClick={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
        >
          {showConfirmPassword ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </span>
      </div>

      {errors.confirmPassword && (
        <p className="otp-error">
          {errors.confirmPassword}
        </p>
      )}

      <button
        className="verify-btn"
        disabled={loading}
      >
        {loading
          ? "Updating Password..."
          : "Reset Password"}
      </button>
    </form>
  );
}

export default ResetPassword;