import { Link } from "react-router-dom";
import { FaCheckCircle, FaCopy } from "react-icons/fa";

function RegistrationSuccess({ registrationData }) {

  const copyVillageId = () => {
    navigator.clipboard.writeText(registrationData.villageId);

    alert("Village ID copied successfully!");
  };

  return (
    <div className="success-card">

      <FaCheckCircle className="success-icon" />

      <h2>Registration Successful</h2>

      <p>
        Congratulations,
        <strong> {registrationData.fullName}</strong>
      </p>

      <p>Your account has been created successfully.</p>

      <div className="village-id-box">

        <h3>Your Village ID</h3>

        <h1>{registrationData.villageId}</h1>

      </div>

      <p className="note">
        Please save this Village ID.
        It will be required during login.
      </p>

      <button
        className="copy-btn"
        onClick={copyVillageId}
      >
        <FaCopy />

        Copy Village ID
      </button>

      <Link
        to="/login"
        className="login-btn-success"
      >
        Go to Login
      </Link>

    </div>
  );
}

export default RegistrationSuccess;