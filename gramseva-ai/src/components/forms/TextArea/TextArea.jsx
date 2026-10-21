import "./TextArea.css";

const TextArea = ({
  label,
  placeholder = "Enter text...",
  rows = 5,
  value,
  onChange,
  required = false,
  error,
}) => {
  return (
    <div className="textarea-group">
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}

      <textarea
        className="textarea"
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>

      {error && (
        <p className="textarea-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;