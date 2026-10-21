import "./Checkbox.css";

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />

      <span className="checkmark"></span>

      <span className="checkbox-label">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;