import "./RadioButton.css";

const RadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <label className="radio-container">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <span className="radio-mark"></span>

      <span className="radio-label">
        {label}
      </span>
    </label>
  );
};

export default RadioButton;