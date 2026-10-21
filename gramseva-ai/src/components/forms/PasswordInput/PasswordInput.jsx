import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "./PasswordInput.css";

const PasswordInput = ({
  label,
  placeholder = "Enter Password",
  value,
  onChange,
  error,
  required = false,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-group">

      {label && (
        <label className="password-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <div className="password-container">

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          className="eye-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </button>

      </div>

      {error && (
        <p className="password-error">
          {error}
        </p>
      )}

    </div>
  );
};

export default PasswordInput;