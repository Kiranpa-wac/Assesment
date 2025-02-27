import React from 'react'
import DepartmentSelect from './DepartmentSelect'
import DesignationSelect from './DesignationSelect'
import EmploymentTypeSelect from './EmploymentTypeSelect'
import { validateForm } from './Hooks/validateForm'
import CustomInput from './CustomInput'

const employmentFields = [
    { label: "Joining Date", field: "joining_date", type: "date" },
    { label: "Salary", field: "salary", type: "number" },
  ];

const EmploymentDetails = ({fieldErrors}) => {
  return (
    <div className="card shadow-lg mb-4 border-0 rounded-lg" >
        <div className="card-header bg-white" >
            <h4 className='card-title text-primary'>Employment Details</h4>
        </div>
        <div className="card-body" >
            <div className="row g-3" >
                <div className="col-md-6" >
                    <DepartmentSelect className="bg-light rounded-lg shadow-sm border-0 w-100" />
                </div>
                <div className="col-md-6">
                    <DesignationSelect className="bg-light rounded-lg shadow-sm border-0 w-100"/>
                </div>
                <div className='col-md-6' >
                    <EmploymentTypeSelect className='bg-light rounded-lg shadow-sm border-0 w-100' />
                </div>
                {employmentFields.map(({label, field, type}) =>(
                    <div key={field} className='col-md-6'>
                        <CustomInput
                        label={label}
                        field={field}
                        type={type}
                        required
                        backendError={fieldErrors[field]}
                        className="bg-light rounded-lg p-2 shadow-sm border-0 w-100"
                        validate={(value, values) => validateForm(values)[field]}
                        />
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default EmploymentDetails
