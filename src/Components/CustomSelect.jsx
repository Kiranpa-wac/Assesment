import React from 'react'
import { useField } from 'informed'

const CustomSelect = ({label, field, children, backendError, ...rest}) => {
    const {fieldApi, fieldState} = useField({field})
    const {error, touched, value} = fieldState
    const displayError = touched && (error || backendError)
  return (
    <div className='mb-3'>
        <label htmlFor={field} className='form-label fw-bold'>
            {label}
        </label>
        <select
        id={field}
        value={value || ""}
        onChange={(e) => fieldApi.setValue(e.target.value)}
        onBlur={() => fieldApi.setTouched(true)}
        className='form-select'
        {...rest}
        >
            {children}
        </select>
        {displayError && <div className='text-danger small'>{error || backendError}</div>}
    </div>
  )
}

export default CustomSelect
