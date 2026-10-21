import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

function Contact() {
  return (
    <section className="contact">
      <div className="contact-header">
        <h2>Contact Gram Panchayat</h2>
        <p>
          We'd love to hear from you. Reach out for assistance or feedback.
        </p>
      </div>

      <div className="contact-container">

        <div className="contact-form">

          <input type="text" placeholder="Full Name" />

          <input type="email" placeholder="Email Address" />

          <input type="tel" placeholder="Mobile Number" />

          <input type="text" placeholder="Subject" />

          <textarea
            rows="6"
            placeholder="Write your message..."
          ></textarea>

          <button>Send Message</button>

        </div>

        <div className="contact-info">

          <div className="info-card">
            <FaMapMarkerAlt />
            <div>
              <h4>Office Address</h4>
              <p>Gram Panchayat Office, Your Village, Maharashtra</p>
            </div>
          </div>

          <div className="info-card">
            <FaPhoneAlt />
            <div>
              <h4>Phone</h4>
              <p>+91 9876543210</p>
            </div>
          </div>

          <div className="info-card">
            <FaEnvelope />
            <div>
              <h4>Email</h4>
              <p>info@gramseva.ai</p>
            </div>
          </div>

          <div className="info-card">
            <FaClock />
            <div>
              <h4>Working Hours</h4>
              <p>Monday – Saturday | 9:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="map-placeholder">
            Google Map
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;