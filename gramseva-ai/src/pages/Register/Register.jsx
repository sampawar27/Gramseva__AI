import "./Register.css";
import { useState } from "react";

import AadhaarVerification from "./components/AadhaarVerification";
import RegistrationForm from "./components/RegistrationForm";
import RegistrationSuccess from "./components/RegistrationSuccess";

function Register() {
  const [step, setStep] = useState(1);

  const [registrationData, setRegistrationData] = useState({
    aadhaar: "",
    fullName: "",
    fatherName: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    mobile: "",
    village: "",
    taluka: "",
    district: "",
    state: "Maharashtra",
    pincode: "",
    password: "",
    confirmPassword: "",
    villageId: "",
  });

  return (
    <div className="register-page">

      <div className="register-container">

        <h1>🌿 GramSeva AI</h1>

        <h2>Create Your Account</h2>

        {/* PROGRESS BAR */}

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

        </div>

        <div className="step-labels">

          <span>Verify Aadhaar</span>

          <span>Registration</span>

          <span>Success</span>

        </div>


        {/* STEP 1 */}

        {step === 1 && (
          <AadhaarVerification
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            setStep={setStep}
          />
        )}


        {/* STEP 2 */}

        {step === 2 && (
          <RegistrationForm
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            setStep={setStep}
          />
        )}


        {/* STEP 3 */}

        {step === 3 && (
          <RegistrationSuccess
            registrationData={registrationData}
          />
        )}

      </div>

    </div>
  );
}

export default Register;