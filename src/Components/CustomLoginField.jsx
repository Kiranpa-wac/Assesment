import React, { useState } from "react";
import { useField } from "informed";
import { Eye, EyeOff } from "lucide-react";

const CustomField = ({
  label,
  fieldType = "text",
  validate,
  required = false,
  placeholder,
  validateOn,
  append,
  ...props
}) => {
  const { fieldState, fieldApi, render } = useField({
    ...props,
    validate,
    validateOn,
  });

  const { error, value } = fieldState;
  const inputId = `${props.name}-input`;
  const errorId = `${props.name}-error`;

  // Manage local state for showing/hiding password.
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = fieldType === "password";
  const actualType = isPassword ? (showPassword ? "text" : "password") : fieldType;

  const togglePassword = () => setShowPassword((prev) => !prev);

  const inputElement = (
    <input
      {...props}
      id={inputId}
      type={actualType}
      value={value || ""}
      onChange={(e) => fieldApi.setValue(e.target.value)}
      onBlur={() => fieldApi.setTouched(true)}
      className={`form-control ${error ? "is-invalid" : ""}`}
      placeholder={placeholder || `Enter ${label.toLowerCase()}`}
      aria-invalid={!!error}
      aria-describedby={error ? errorId : undefined}
    />
  );

  return render(
    <div className="mb-3">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      {isPassword ? (
        <div className="input-group">
          {inputElement}
          <button
            type="button"
            onClick={togglePassword}
            className="btn btn-outline-secondary"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      ) : append ? (
        <div className="input-group">
          {inputElement}
          {append}
        </div>
      ) : (
        inputElement
      )}
      {error && (
        <div id={errorId} className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default CustomField;
