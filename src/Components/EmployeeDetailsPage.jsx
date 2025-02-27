import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pencil, ArrowLeft, Users, Briefcase, CreditCard, Phone, Calendar } from "lucide-react";
import useEmpPageState from "./Hooks/useEmpPageState";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import ProfileImg from "./ProfileImg";
import SuccessToast from "./SuccessToast";
import "./EmployeeDetailsPage.css";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const {
    formData,
    showSuccessToast,
    error,
    isLoading,
    handleEdit,
    handleCancel,
    handleSuccess,
  } = useEmpPageState(id);

  const getPersonalInfo = (formData) => [
    { label: "Employee Code", value: formData?.employee_code },
    { label: "Email", value: formData?.email },
    { label: "Mobile", value: formData?.phone },
    { label: "Date of Birth", value: formData?.formatted_dob },
    { label: "Address", value: formData?.address },
    { label: "City", value: formData?.city },
    { label: "State", value: formData?.state },
    { label: "Country", value: formData?.country },
    { label: "Gender", value: formData?.gender === 1 ? "Male" : formData?.gender === 2 ? "Female" : "Others" },
    { label: "Zip code", value: formData?.zip_code },
  ];

  const getEmploymentInfo = (formData) => [
    { label: "Department", value: formData?.department?.name },
    { label: "Designation", value: formData?.designation?.title },
    { label: "Employment Type", value: formData?.employment_type?.title },
    { label: "Joining Date", value: formData?.formatted_joining_date },
    { label: "Salary", value: `₹${parseFloat(formData?.salary).toLocaleString("en-IN", { minimumFractionDigits: 2 })}` },
  ];

  const getBankingInfo = (formData) => [
    { label: "Bank Account", value: formData?.bank_account_number },
    { label: "IFSC Code", value: formData?.ifsc_code },
  ];

  const getEmergencyInfo = (formData) => [
    { label: "Emergency Contact", value: formData?.emergency_contact },
  ];

  const getSystemInfo = (formData) => [
    { label: "Created By", value: formData?.created_by?.name },
    { label: "Updated By", value: formData?.updated_by?.name },
  ];

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Failed to load employee details
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <button
        className="btn btn-link text-muted d-flex align-items-center mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="me-2" size={20} />
        Go Back
      </button>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-4">
            <ProfileImg src={formData?.profile_picture} />
            <h2 className="h4 mb-2 text-dark font-weight-bold">{formData?.name}</h2>
            <p className="text-muted mb-3">
              <span className="badge bg-secondary rounded-pill">
                {formData?.designation?.title || "Designation"}
              </span>
            </p>
            <button
              onClick={() => {
                handleEdit();
                setShowModal(true);
              }}
              className="btn btn-primary text-white rounded-pill px-4 py-2 shadow-sm transition-all hover-shadow"
            >
              <Pencil className="me-2" /> Edit Details
            </button>
          </div>

          {/* Personal Information */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Users className="me-2" size={24} />
              <h5>Personal Information</h5>
            </div>
            <div className="row">
              {getPersonalInfo(formData).map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <strong>{item.label}:</strong> <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Employment Information */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Briefcase className="me-2" size={24} />
              <h5>Employment Information</h5>
            </div>
            <div className="row">
              {getEmploymentInfo(formData).map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <strong>{item.label}:</strong> <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Banking Information */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <CreditCard className="me-2" size={24} />
              <h5>Banking Information</h5>
            </div>
            <div className="row">
              {getBankingInfo(formData).map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <strong>{item.label}:</strong> <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Phone className="me-2" size={24} />
              <h5>Emergency Contact</h5>
            </div>
            <div className="row">
              {getEmergencyInfo(formData).map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <strong>{item.label}:</strong> <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* System Information */}
          <div className="mb-4">
            <div className="d-flex align-items-center">
              <Calendar className="me-2" size={24} />
              <h5>System Information</h5>
            </div>
            <div className="row">
              {getSystemInfo(formData).map((item, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <strong>{item.label}:</strong> <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showSuccessToast && <SuccessToast />}

      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content rounded-lg shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Edit Employee Details</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    handleCancel();
                    setShowModal(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <EmployeeDetailsForm
                  key={JSON.stringify(formData)}
                  initialValues={formData}
                  onSuccess={() => {
                    handleSuccess();
                    setShowModal(false);
                  }}
                  onCancel={() => {
                    handleCancel();
                    setShowModal(false);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsPage;
