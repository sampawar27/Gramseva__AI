import { useEffect, useState } from "react";

function VerifyOtp({
  forgotData,
  setForgotData,
  setStep,
}) {

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  // Mock OTP
  const generatedOtp = "123456";

  useEffect(() => {

    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  const handleVerify = () => {

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP.");
      return;
    }

    if (otp !== generatedOtp) {
      setError("Invalid OTP.");
      return;
    }

    setForgotData((prev) => ({
      ...prev,
      otp,
    }));

    setStep(3);
  };

  const handleResend = () => {
    setTimer(30);
    setError("");
    alert("Mock OTP sent successfully!\n\nOTP: 123456");
  };

  return (

    <div className="otp-card">

      <h2>OTP Verification</h2>

      <p>
        Enter the 6-digit OTP sent to your registered mobile number.
      </p>

      <input
        type="text"
        maxLength={6}
        className="otp-input"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => {
          setOtp(e.target.value.replace(/\D/g, ""));
          setError("");
        }}
      />

      {error && (
        <p className="otp-error">
          {error}
        </p>
      )}

      <button
        className="verify-btn"
        onClick={handleVerify}
      >
        Verify OTP
      </button>

      <div className="otp-footer">

        {timer > 0 ? (
          <span>
            Resend OTP in {timer}s
          </span>
        ) : (
          <button
            className="resend-btn"
            onClick={handleResend}
          >
            Resend OTP
          </button>
        )}

      </div>

      <p className="demo-otp">
        Demo OTP: <strong>123456</strong>
      </p>

    </div>

  );

}

export default VerifyOtp;