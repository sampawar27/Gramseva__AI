import "./Departments.css";
import {
  FaTint,
  FaBolt,
  FaHospital,
  FaBroom,
  FaRoad,
  FaSeedling,
  FaGraduationCap,
  FaMoneyBillWave,
  FaFemale,
} from "react-icons/fa";

const departments = [
  {
    icon: <FaTint />,
    title: "Water Supply",
    description: "Water connections and maintenance",
  },
  {
    icon: <FaBolt />,
    title: "Electricity",
    description: "Street lights and electrical services",
  },
  {
    icon: <FaHospital />,
    title: "Health",
    description: "Health camps and medical services",
  },
  {
    icon: <FaBroom />,
    title: "Sanitation",
    description: "Cleanliness and waste management",
  },
  {
    icon: <FaRoad />,
    title: "Roads",
    description: "Road construction and maintenance",
  },
  {
    icon: <FaSeedling />,
    title: "Agriculture",
    description: "Farmer schemes and agriculture support",
  },
  {
    icon: <FaGraduationCap />,
    title: "Education",
    description: "Schools and scholarship services",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Revenue",
    description: "Taxes and revenue collection",
  },
  {
    icon: <FaFemale />,
    title: "Women & Child Welfare",
    description: "Women empowerment and child welfare",
  },
];

function Departments() {
  return (
    <section className="departments">

      <div className="departments-header">

        <h2>Gram Panchayat Departments</h2>

        <p>
          Access all department services digitally through one platform.
        </p>

      </div>

      <div className="departments-grid">

        {departments.map((department, index) => (

          <div className="department-card" key={index}>

            <div className="department-icon">
              {department.icon}
            </div>

            <h3>{department.title}</h3>

            <p>{department.description}</p>

            <button>
              Explore Department
            </button>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Departments;