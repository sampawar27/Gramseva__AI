import "./DashboardCard.css";

function DashboardCard({ title, description, emoji, onClick }) {
  return (
    <div className="dashboard-card" onClick={onClick}>
      <div className="card-icon">{emoji}</div>

      <h3>{title}</h3>

      <p>{description}</p>
    </div>
  );
}

export default DashboardCard;