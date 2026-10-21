import "./Footer.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
          <h2>🌿 GramSeva AI</h2>

          <p>
            Empowering villages through secure,
            transparent and AI-powered digital governance.
          </p>
        </div>

        <div className="footer-section">

          <h3>Quick Links</h3>

          <a href="#">Home</a>
          <a href="#">Services</a>
          <a href="#">Schemes</a>
          <a href="#">Departments</a>
          <a href="#">Contact</a>

        </div>

        <div className="footer-section">

          <h3>Citizen Services</h3>

          <a href="#">Certificates</a>
          <a href="#">Complaints</a>
          <a href="#">Taxes</a>
          <a href="#">AI Assistant</a>
          <a href="#">Notices</a>

        </div>

        <div className="footer-section">

          <h3>Contact</h3>

          <p><FaMapMarkerAlt /> Gram Panchayat Office</p>

          <p><FaPhone /> +91 9876543210</p>

          <p><FaEnvelope /> support@gramseva.ai</p>

          <div className="social-icons">

            <FaFacebook />

            <FaInstagram />

            <FaTwitter />

            <FaLinkedin />

          </div>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 GramSeva AI | Privacy Policy | Terms & Conditions

      </div>

    </footer>
  );
}

export default Footer;