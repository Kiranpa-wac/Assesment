import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { useAtomValue } from 'jotai';
import { authState } from '../authState';
import axios from 'axios';

const fetcher = (url, token, id) =>
  axios.get(url, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(res => res.data.data);

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = useAtomValue(authState);
  const token = auth?.token;

  const { data: employee, error } = useSWR(
    token && id ? ['employee', id, token] : null,
    ([, id, token]) => fetcher('${import.meta.env.VITE_URL}/employee-portal/api/v1/employee/show', token, id)
  );

  const [formData, setFormData] = useState(employee || {});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    console.log(formData)

    try {
      await axios.post(
        `${import.meta.env.VITE_URL}/employee-portal/api/v1/employee/update`,
        { ...formData, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Redirect back to the detail page after successful update
      navigate(`/detail/${id}`);
    } catch (err) {
      setErrorMessage('An error occurred while saving the data.');
    } finally {
      setLoading(false);
    }
  };

  if (error) return <div className="error-message">Failed to fetch employee details</div>;
  if (!employee) return <div className="loading-message">Loading...</div>;

  return (
    <div className="form-container">
      <h1>Edit Employee Details</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender || ''}
            onChange={handleChange}
          >
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </div>

        {/* Add other form fields like date_of_birth, salary, etc. */}

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/detail/${id}`)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployee;
