import { useState } from "react";
import axios from "axios";

const useUpdate = (token) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const allowedKeys = [
    "id", "name", "email", "phone", "designation_id", "department_id",
    "gender", "date_of_birth", "address", "city", "state", "zip_code",
    "country", "employment_type_id", "joining_date", "salary",
    "bank_account_number", "ifsc_code", "emergency_contact", "employee_code",
  ];
  const numericKeys = [
    "designation_id",
    "department_id",
    "gender",
    "employment_type_id",
    "salary",
    "id",
  ];

  const createPayload = (data) => {
    const formData = new FormData();
    allowedKeys.forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        const value = numericKeys.includes(key) ? String(Number(data[key])) : data[key];
        formData.append(key, value);
      }
    });
    if (data.profile_picture instanceof File) {
      formData.append("profile_picture", data.profile_picture);
    }
    return formData;
  };

  const updateEmployee = async (data) => {
    setIsSaving(true);
    setSaveError("");
    setFieldErrors({});

    try {
      const payload = createPayload(data);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/employee-portal/api/v1/employee/update`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        return { success: true, data: response.data };
      } else {
        throw new Error("Failed to update employee details.");
      }
    } catch (err) {
      const backendErrors = err.response?.data?.errors || {};
      setFieldErrors(backendErrors);
      const backendMessage = err.response?.data?.message || "Error updating employee details.";
      setSaveError(backendMessage);
      return { success: false, error: backendMessage, fieldErrors: backendErrors };
    } finally {
      setIsSaving(false);
    }
  };

  return { updateEmployee, isSaving, saveError, fieldErrors };
};

export default useUpdate;
