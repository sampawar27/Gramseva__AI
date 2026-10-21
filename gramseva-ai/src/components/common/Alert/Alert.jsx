import "./Alert.css";

const Alert = ({
  type = "success",
  title,
  message,
}) => {
  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <h4>{title}</h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;