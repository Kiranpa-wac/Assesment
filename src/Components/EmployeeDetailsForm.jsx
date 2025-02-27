import React from "react";
import {
  useDepartments,
  useDesignations,
  useEmploymentTypes,
} from "./Hooks/useMasterData";
import useForm from "./Hooks/useForm";
import CustomInput from "./CustomInput";
import CustomFileInput from "./CustomFileInput";
import { Form } from "informed";
import CustomRadioSelect from "./CustomRadioSelect";
import CustomSelect from "./CustomSelect";
import EmploymentDetails from "./EmploymentDetails";
import { validateForm } from "./Hooks/validateForm";
import "./EmployeeDetailsform.css"; // Updated for styling

const personalFields = [
  { label: "Employee Code", field: "employee_code", type: "text" },
  { label: "Name", field: "name", type: "text" },
  { label: "Email", field: "email", type: "email" },
  { label: "Mobile", field: "phone", type: "text" },
  { label: "Date of Birth", field: "date_of_birth", type: "date" },
];

const addressFields = [
  { label: "Address", field: "address", type: "text" },
  { label: "City", field: "city", type: "text" },
  { label: "State", field: "state", type: "text" },
  { label: "Zip Code", field: "zip_code", type: "text" },
  { label: "Country", field: "country", type: "text" },
];

const employmentFields = [
  { label: "Joining Date", field: "joining_date", type: "date" },
  { label: "Salary", field: "salary", type: "number" },
];

const bankingFields = [
  { label: "Bank Account Number", field: "bank_account_number", type: "text" },
  { label: "IFSC Code", field: "ifsc_code", type: "text" },
];

const emergencyFields = [
  { label: "Emergency Contact", field: "emergency_contact", type: "text" },
];

const genderOptions = [
  { label: "Male", value: 1 },
  { label: "Female", value: 2 },
  { label: "Other", value: 3 },
];

const EmployeeDetailsForm = ({ initialValues, onSuccess, onCancel }) => {
  const { handleSubmit, isSaving, fieldErrors } = useForm(
    initialValues,
    onSuccess
  );
  const { departments } = useDepartments();
  const { designations } = useDesignations();
  const { employmentTypes } = useEmploymentTypes();

  const renderForm = (title, fields) => (
    <div className="card shadow-lg mb-4 border-0 rounded-lg">
      <div className="card-header bg-white">
        <h4 className="card-title text-primary">{title}</h4>
      </div>
      <div className="card-body">
        <div className="row g-3">
          {fields.map(({ label, field, type }) => (
            <div key={field} className="col-md-6">
              <CustomInput
                label={label}
                field={field}
                type={type}
                required
                backendError={fieldErrors[field]}
                validate={(value, values) => 
                  validateForm(values)[field]
                } 
                className="bg-light rounded-lg p-2 shadow-sm border-0 w-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      focusOnInvalid={true}
    >
      <div className="mb-4">
        <div className="card shadow-lg mb-4 border-0 rounded-lg">
          <div className="card-header bg-white">
            <h4 className="card-title text-primary">Profile Picture</h4>
          </div>
          <div className="card-body">
            <CustomFileInput
              label="Upload Photo"
              field="profile_picture"
              className="bg-light rounded-lg p-3 shadow-sm w-100 border-0"
              validate={(value, values) =>
                validateForm(values).profile_picture
              }
            />
          </div>
        </div>
        {renderForm("Personal Information", personalFields)}

        <div className="card shadow-lg mb-4 border-0 rounded-lg">
          <div className="card-header bg-white">
            <h4 className="card-title text-primary">Gender</h4>
          </div>
          <div className="card-body">
            <CustomRadioSelect
              label="Select Gender"
              field="gender"
              options={genderOptions}
              required
              backendError={fieldErrors["gender"]}
              className="bg-light rounded-lg p-3 shadow-sm border-0 w-100"
            />
          </div>
        </div>

        {renderForm("Address Details", addressFields)}

        {/* <div className="card shadow-lg mb-4 border-0 rounded-lg">
          <div className="card-header bg-white">
            <h4 className="card-title text-primary">Employment Details</h4>
          </div>
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <CustomSelect
                  label="Department"
                  field="department_id"
                  className="bg-light rounded-lg shadow-sm border-0 w-100"
                >
                  {departments?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.name}
                    </option>
                  ))}
                </CustomSelect>
              </div>
              <div className="col-md-6">
                <CustomSelect
                  label="Designation"
                  field="designation_id"
                  className="bg-light rounded-lg shadow-sm border-0 w-100"
                >
                  {designations?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </CustomSelect>
              </div>
              <div className="col-md-6">
                <CustomSelect
                  label="Employment Type"
                  field="employment_type_id"
                  className="bg-light rounded-lg shadow-sm border-0 w-100"
                >
                  {employmentTypes?.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.title}
                    </option>
                  ))}
                </CustomSelect>
              </div>
              {employmentFields.map(({ label, field, type }) => (
                <div key={field} className="col-md-6">
                  <CustomInput
                    label={label}
                    field={field}
                    type={type}
                    required
                    backendError={fieldErrors[field]}
                    className="bg-light rounded-lg p-2 shadow-sm border-0 w-100"
                    validate={(value, values) =>
                      validateEmployeeForm(values)[field]
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div> */}
        <EmploymentDetails fieldErrors={fieldErrors} />
        {renderForm("Banking Information", bankingFields)}
        {renderForm("Emergency Contact", emergencyFields)}
      </div>

      <div className="card shadow-lg mb-4 border-0 rounded-lg">
        <div className="card-body text-center">
          <button
            type="submit"
            className={`btn ${isSaving ? "btn-secondary" : "btn-primary"} rounded-pill px-5 py-2 shadow-sm`}
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-secondary rounded-pill px-5 py-2 ms-3"
          >
            Cancel
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EmployeeDetailsForm;