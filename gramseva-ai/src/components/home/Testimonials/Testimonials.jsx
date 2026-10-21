import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ramesh Patil",
    role: "Citizen",
    message:
      "Applying for certificates is now much easier. The AI assistant answered all my questions instantly.",
  },
  {
    name: "Sunita Jadhav",
    role: "Gram Sevak",
    message:
      "Our Gram Panchayat work has become completely digital and paperless. It saves a lot of time.",
  },
  {
    name: "Sarpanch",
    role: "Village Administration",
    message:
      "The complaint tracking system has improved transparency and citizen satisfaction.",
  },
];

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="testimonial-header">
        <h2>What Citizens Say</h2>
        <p>Trusted by citizens and Gram Panchayat officials.</p>
      </div>

      <div className="testimonial-grid">

        {testimonials.map((item, index) => (

          <div className="testimonial-card" key={index}>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p className="message">
              "{item.message}"
            </p>

            <div className="user-info">
              <div className="avatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Testimonials;