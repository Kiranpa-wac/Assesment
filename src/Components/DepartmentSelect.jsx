import React from 'react'
import CustomSelect from './CustomSelect'
import { useDepartments } from './Hooks/useMasterData'

const DepartmentSelect = ({field = 'department_id', className}) => {
    const {departments, isLoading} = useDepartments()

    if(isLoading){
        return(
            <div className={className}>
                <span>Loading...</span>
            </div>
        )
    }
  return (
    <CustomSelect label='Department' field={field} className={className}>
        <option value="">Select Department</option>
        {departments?.map((dept) => (
            <option key={dept.id} value={dept.id}>
                {dept.name}
            </option>
        ))}
    </CustomSelect>
  )
}

export default DepartmentSelect
