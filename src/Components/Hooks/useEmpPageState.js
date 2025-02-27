import { useState, useEffect } from "react";
import useDetailsPage from "./useDetailsPage";

const useEmpPageState = (id) => {
  const { details, isLoading, error, mutate } = useDetailsPage(id);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (details && !editMode) {
      setFormData(details);
    }
  }, [details, editMode]);

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSuccess = (payload) => {
    console.log('Showing success toast');
    setEditMode(false);
    setShowSuccessToast(true);
    setFormData(payload);
    mutate();
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return {
    formData,
    editMode,
    showSuccessToast,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  };
};

export default useEmpPageState;
