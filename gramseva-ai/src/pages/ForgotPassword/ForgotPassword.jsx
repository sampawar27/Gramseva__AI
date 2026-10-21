import "./ForgotPassword.css";
import { useState } from "react";

import VerifyVillageId from "./components/VerifyVillageId";
import VerifyOtp from "./components/VerifyOtp";
import ResetPassword from "./components/ResetPassword";
import ResetSuccess from "./components/ResetSuccess";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [forgotData, setForgotData] = useState({
    villageId: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="forgot-page">

      <div className="forgot-container">

        <h1>🌿 GramSeva AI</h1>

        <h2>Forgot Password</h2>

        {/* Progress Bar */}

        <div className="progress-bar">

          <div className={step >= 1 ? "step active" : "step"}>
            1
          </div>

          <div className="line"></div>

          <div className={step >= 2 ? "step active" : "step"}>
            2
          </div>

          <div className="line"></div>

          <div className={step >= 3 ? "step active" : "step"}>
            3
          </div>

          <div className="line"></div>

          <div className={step >= 4 ? "step active" : "step"}>
            4
          </div>

        </div>

        <div className="step-labels">

          <span>Village ID</span>

          <span>OTP</span>

          <span>Reset</span>

          <span>Success</span>

        </div>

        {step === 1 && (
          <VerifyVillageId
            forgotData={forgotData}
            setForgotData={setForgotData}
            setStep={setStep}
          />
        )}

        {step === 2 && (
          <VerifyOtp
            forgotData={forgotData}
            setForgotData={setForgotData}
            setStep={setStep}
          />
        )}

        {step === 3 && (
          <ResetPassword
            forgotData={forgotData}
            setForgotData={setForgotData}
            setStep={setStep}
          />
        )}

        {step === 4 && (
          <ResetSuccess />
        )}

      </div>

    </div>
  );
}

export default ForgotPassword;