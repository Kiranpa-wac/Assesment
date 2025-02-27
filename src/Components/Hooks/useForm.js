import useUpdate from "./useUpdate";
import { useAtomValue } from "jotai";
import { authState } from "../../authState";

const useForm = (initialValues, onSuccess) => {
  const auth = useAtomValue(authState);
  const token = auth?.token;
  const { updateEmployee, isSaving, fieldErrors } = useUpdate(token);

  const handleSubmit = async (values) => {
    console.log(values);
    const payload = { ...values.values, id: initialValues.id };
    const result = await updateEmployee(payload);
    if (result.success && onSuccess) {
      onSuccess(payload);
    }
    return result;
  };

  return { handleSubmit, isSaving, fieldErrors };
};

export default useForm;
