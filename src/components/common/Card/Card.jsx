import "./Card.css";

const Card = ({
  title,
  subtitle,
  description,
  icon,
  children,
  footer,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      {icon && <div className="card-icon">{icon}</div>}

      {title && <h3 className="card-title">{title}</h3>}

      {subtitle && (
        <p className="card-subtitle">
          {subtitle}
        </p>
      )}

      {description && (
        <p className="card-description">
          {description}
        </p>
      )}

      {children}

      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;