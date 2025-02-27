import React from 'react'
import CustomSelect from './CustomSelect'
import { useDesignations } from './Hooks/useMasterData'
const DesignationSelect = ({field = 'designation_id', className}) => {
    const {designations, isLoading} = useDesignations()

    if(isLoading){
        return(
            <div className={className}>
                <span>Loading...</span>
            </div>
        )
    }
  return (
    <CustomSelect label='Designation' field={field} className={className}>
        <option value="">Select Designation</option>
        {designations?.map((des) => (
            <option key={des.id} value={des.id}>
                {des.title}
            </option>
        ))}
    </CustomSelect>
  )
}

export default DesignationSelect
