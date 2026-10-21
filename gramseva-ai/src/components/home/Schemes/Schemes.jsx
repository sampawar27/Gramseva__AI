import "./Schemes.css";
import {
  FaHome,
  FaSeedling,
  FaTint,
  FaHeartbeat,
  FaUserShield,
  FaGraduationCap,
} from "react-icons/fa";

const schemes = [
  {
    icon: <FaHome />,
    title: "PM Awas Yojana",
    category: "Housing",
    description:
      "Financial assistance for constructing or purchasing houses.",
  },
  {
    icon: <FaSeedling />,
    title: "PM Kisan Samman Nidhi",
    category: "Agriculture",
    description:
      "Income support for eligible farmers across India.",
  },
  {
    icon: <FaTint />,
    title: "Jal Jeevan Mission",
    category: "Water",
    description:
      "Safe drinking water through household tap connections.",
  },
  {
    icon: <FaHeartbeat />,
    title: "Ayushman Bharat",
    category: "Healthcare",
    description:
      "Health insurance benefits for eligible families.",
  },
  {
    icon: <FaUserShield />,
    title: "National Pension Scheme",
    category: "Social Security",
    description:
      "Retirement benefits and pension support.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Scholarship Schemes",
    category: "Education",
    description:
      "Scholarships for eligible students.",
  },
];

function Schemes() {
  return (
    <section className="schemes">
      <div className="schemes-header">
        <h2>Government Schemes</h2>

        <p>
          Explore various Central and State Government schemes.
        </p>
      </div>

      <div className="schemes-grid">
        {schemes.map((scheme, index) => (
          <div className="scheme-card" key={index}>
            <div className="scheme-icon">
              {scheme.icon}
            </div>

            <span className="scheme-category">
              {scheme.category}
            </span>

            <h3>{scheme.title}</h3>

            <p>{scheme.description}</p>

            <div className="scheme-buttons">
              <button className="outline-btn">
                View Details
              </button>

              <button className="primary-btn">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Schemes;