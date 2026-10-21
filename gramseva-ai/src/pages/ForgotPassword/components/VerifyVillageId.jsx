import { useState } from "react";
import { Link } from "react-router-dom";

function VerifyVillageId({
  forgotData,
  setForgotData,
  setStep,
}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock Database
  const registeredUsers = [
    {
      villageId: "BID20250001",
      name: "Rahul Patil",
      mobile: "9876543210",
    },
    {
      villageId: "ICH20250002",
      name: "Sneha Patil",
      mobile: "9876543211",
    },
  ];

  const handleChange = (e) => {

    setForgotData((prev) => ({
      ...prev,
      villageId: e.target.value.toUpperCase(),
    }));

    setError("");
  };

  const handleVerify = () => {

    if (!forgotData.villageId.trim()) {
      setError("Village ID is required.");
      return;
    }

    setLoading(true);

    setTimeout(() => {

      const user = registeredUsers.find(
        (u) => u.villageId === forgotData.villageId
      );

      if (!user) {
        setLoading(false);
        setError("Village ID not found.");
        return;
      }

      setLoading(false);

      setStep(2);

    }, 2000);

  };

  return (

    <div className="verify-card">

      <h2>Verify Village ID</h2>

      <p>
        Enter your Village ID to continue.
      </p>

      <input
        type="text"
        placeholder="Village ID"
        value={forgotData.villageId}
        onChange={handleChange}
        className="verify-input"
      />

      {error && (
        <p className="verify-error">
          {error}
        </p>
      )}

      <button
        className="verify-btn"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Verify Village ID"}
      </button>

      <div className="back-login">

        Remember your password?

        <Link to="/login">
          Login
        </Link>

      </div>

    </div>

  );
}

export default VerifyVillageId;