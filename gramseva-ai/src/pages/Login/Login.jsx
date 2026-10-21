import api from "../../api/api";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaLock,
} from "react-icons/fa";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    villageId: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const navigate=useNavigate();
  const [loginError, setLoginError] = useState("");

  // Load saved Village ID when page opens
  useEffect(() => {
    const savedVillageId = localStorage.getItem("rememberVillageId");

    if (savedVillageId) {
      setFormData((prev) => ({
        ...prev,
        villageId: savedVillageId,
        rememberMe: true,
      }));
    }
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!formData.villageId.trim()) {
      newErrors.villageId = "Village ID is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Login
// Login
const handleLogin = async (e) => {
  e.preventDefault();
  setLoginError("");

  if (!validate()) return;

  setLoading(true);

  try {
    const response = await api.post("/auth/login", {
      villageId: formData.villageId,
      password: formData.password,
    });

    const data = response.data;

    // Remember Me
    if (formData.rememberMe) {
      localStorage.setItem("rememberVillageId", formData.villageId);
    } else {
      localStorage.removeItem("rememberVillageId");
    }
        if (data.token) {
  localStorage.setItem("token", data.token);
}
    // Save Logged-in User
localStorage.setItem(
    "user",
    JSON.stringify({
        id: data.id,
        villageId: data.villageId,
        fullName: data.fullName,
        role: data.role,
        status: data.status,
        token: data.token
    })
);

localStorage.setItem("token", data.token);
alert(data.message);

    // Role Based Navigation (Dashboard will be created later)
    if (data.role === "CITIZEN") {
      navigate("/citizen/dashboard");
    } else if (data.role === "OFFICER") {
      navigate("/officer/dashboard");
    } else if (data.role === "ADMIN") {
      navigate("/admin/dashboard");
    }

  } catch (error) {

    if (error.response) {
      setLoginError(error.response.data.message);
    } else {
      setLoginError("Unable to connect to server.");
    }

  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="login-left">
        <div className="overlay"></div>

        <div className="left-content">
          <h1>🌿 GramSeva AI</h1>

          <h2>Smart Digital Governance for Every Village</h2>

          <p>
            A secure digital platform for Gram Panchayats where citizens can
            apply for certificates, complaints, taxes, government schemes and
            AI-powered assistance.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>

          <p>Login using your Village ID</p>

          <form onSubmit={handleLogin}>
            {/* Village ID */}
            <div className="input-group">
              <FaUserShield className="icon" />

              <input
                type="text"
                name="villageId"
                placeholder="Village ID"
                value={formData.villageId}
                onChange={handleChange}
              />
            </div>

            {errors.villageId && (
              <p className="error">{errors.villageId}</p>
            )}

            {/* Password */}
            <div className="input-group">
              <FaLock className="icon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />

              {showPassword ? (
                <FaEyeSlash
                  className="eye"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="eye"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>

            {errors.password && (
              <p className="error">{errors.password}</p>
            )}

            {/* Remember Me */}
            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />


                Remember Me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

             {loginError && (
               <p className="error">{loginError}</p>
               )}
            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <div className="register-link">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;