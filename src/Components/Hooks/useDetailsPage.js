import { useState,  useMemo } from "react";
import useSWR from "swr";
import axios from "axios";
import { useAtomValue, useSetAtom } from "jotai";
import { authState } from "../../authState";
import useUpdate from "./useUpdate";

const fetcher = async (url, id, token) => {
  try{

    const response = await axios.get(url, {
      params: { id },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch(error){
    if (error.response?.status === 401) {
      setUser(null); 
  }
  throw error;
  }
};

const useDetailsPage = (id) => {
  const auth = useAtomValue(authState);
  const setUser = useSetAtom(authState)
  const token = auth?.token;

  const { data, error, isLoading, mutate } = useSWR(
    token && id ? ["employeeDetails", id, token] : null,
    ([, id, token]) => fetcher(`${import.meta.env.VITE_URL}/employee-portal/api/v1/employee/show`, id, token, setUser)
  );
  
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // const { updateEmployee, isSaving, saveError, fieldErrors } = useUpdate(token);

  const details = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      designation_id: data.designation?.id,
      department_id: data.department?.id,
      employment_type_id: data.employment_type?.id,
    };
  }, [data]);

  return {details, error, isLoading, mutate};
};

export default useDetailsPage;