import React from "react";
import { useField } from "informed";

const CustomInput = ({
  label,
  field,
  type = "text",
  backendError,
  ...rest
}) => {
  const { fieldState, fieldApi } = useField({ field });
  const { error, touched, value } = fieldState;
  const displayError = touched && (error || backendError);

  return (
    <div className="mb-3">
      <label htmlFor={field} className="form-label fw-bold">
        {label}
      </label>
      <input
        type={type}
        id={field}
        value={value || ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        className="form-control"
        {...rest}
      />
      {displayError && <div className="text danger small">{error || backendError}</div>}
    </div>
  );
};
export default CustomInput
