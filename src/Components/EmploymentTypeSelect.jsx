import React from 'react'
import CustomSelect from './CustomSelect'
import { useEmploymentTypes } from './Hooks/useMasterData'
const EmploymentTypeSelect = ({field = 'employment_type_id', className}) => {
    const {employmentTypes, isLoading} = useEmploymentTypes()

    if (isLoading){
        return(
            <div className={className}>
                <span>Loading...</span>
            </div>
        )
    }
  return (
    <CustomSelect label="Employement Type" field={field} className={className}>
        <option value="">Select Employment Type</option>
        {employmentTypes?.map((emp) => (
            <option key={emp.id} value={emp.id}>
                {emp.title}
            </option>
        ))}
    </CustomSelect>
  )
}

export default EmploymentTypeSelect