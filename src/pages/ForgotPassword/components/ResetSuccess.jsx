import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function ResetSuccess() {
  return (
    <div className="reset-success-card">

      <FaCheckCircle className="success-icon" />

      <h2>Password Updated Successfully</h2>

      <p>
        Your password has been reset successfully.
      </p>

      <p>
        You can now login using your new password.
      </p>

      <Link
        to="/login"
        className="login-btn-success"
      >
        Go to Login
      </Link>

    </div>
  );
}

export default ResetSuccess;