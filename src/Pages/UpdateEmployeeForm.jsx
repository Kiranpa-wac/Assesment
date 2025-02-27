import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { authState } from '../authState';
import { useAtomValue } from 'jotai';
const UpdateEmployeeForm = () => {
  const { id } = useParams();
  console.log(id)
  const auth = useAtomValue(authState);
  const token = auth?.token;
  const navigate = useNavigate();
  const { state } = useLocation();
  const employee = state?.employee;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    designation_id: '',
    department_id: '',
    gender: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    employment_type_id: '',
    joining_date: '',
    salary: '',
    bank_account_number: '',
    ifsc_code: '',
    emergency_contact: '',
    employee_code: '',
    profile_picture: null,
  });

  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const [designationRes, departmentRes, employmentTypeRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_URL}/employee-portal/api/v1/settings/designations`, config),
          axios.get(`${import.meta.env.VITE_URL}/employee-portal/api/v1/settings/departments`, config),
          axios.get(`${import.meta.env.VITE_URL}/employee-portal/api/v1/settings/employment-types`, config),
        ]);

        setDesignations(designationRes.data);
        setDepartments(departmentRes.data);
        setEmploymentTypes(employmentTypeRes.data);
      } catch (err) {
        setError('Failed to load dropdown options');
      }
    };

    fetchDropdowns();

    console.log(departments)
    if (employee) {
      setFormData({
        ...employee,
        profile_picture: null, 
      });
    }
  }, [employee, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024 && ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      setFormData((prevState) => ({ ...prevState, profile_picture: file }));
      setFileError('');
    } else {
      setFileError('Profile picture must be JPEG, PNG, or JPG and less than 2MB.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFileError('');

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profile_picture' && formData[key]) {
        formDataToSubmit.append(key, formData[key]);
      } else if (key !== 'profile_picture') {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/employee-portal/api/v1/employee/update`,
        formDataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        navigate(`/employee-details/${id}`);
      } else {
        setError('Failed to update employee details.');
      }
    } catch (err) {
      setError('Failed to update employee details.');
    } finally {
      setLoading(false);
    }
  };
  if (!employee) return <div>No employee found</div>;
  return (
    <div>
      <h1>Edit Employee Details</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {fileError && <div style={{ color: 'red' }}>{fileError}</div>}
      {loading && <div>Loading...</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>Save Changes</button>
      </form>
    </div>
  );
};

export default UpdateEmployeeForm;
