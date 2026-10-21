import "./ApplyCertificate.css";
import { useNavigate } from "react-router-dom";

function ApplyCertificate() {

    const navigate = useNavigate();

    return (

        <div className="certificate-page">

            <h1>📄 Apply for Certificate</h1>

            <p>Select the certificate you want to apply for.</p>

            <div className="certificate-grid">

                <div
                    className="certificate-card"
                    onClick={() => navigate("/citizen/apply-certificate/birth")}
                >
                    <h2>👶 Birth Certificate</h2>

                    <p>Apply for Birth Certificate</p>
                </div>

                <div
                    className="certificate-card"
                    onClick={() => navigate("/citizen/apply-certificate/income")}
                >
                    <h2>💰 Income Certificate</h2>

                    <p>Apply for Income Certificate</p>
                </div>

                <div
                    className="certificate-card"
                    onClick={() => navigate("/citizen/apply-certificate/residence")}
                >
                    <h2>🏠 Residence Certificate</h2>

                    <p>Apply for Residence Certificate</p>
                </div>

            </div>

        </div>

    );

}

export default ApplyCertificate;