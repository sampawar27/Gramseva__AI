import "./Select.css";

const Select = ({
  label,
  options = [],
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="select-group">
      {label && (
        <label className="select-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <select
        className="select"
        value={value}
        onChange={onChange}
      >
        <option value="">Select an option</option>

        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="select-error">{error}</p>}
    </div>
  );
};

export default Select;