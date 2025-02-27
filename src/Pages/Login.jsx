import React, { useState } from 'react';
import axios from 'axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { authState } from '../authState';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form } from 'informed';
import CustomField from '../Components/CustomLoginField';
import './Login.css';

function Login() {
  const setAuth = useSetAtom(authState);
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const user = useAtomValue(authState);
  if (user?.token) {
    return <Navigate to='/' replace />;
  }

  // Email validation function
  const validateEmail = (value) => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email address';
    }
  };

  const handleLogin = async (values) => {
    setIsLoading(true);
    try {
      console.log(values);
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/employee-portal/api/v1/auth/login`,
        {
          username: values.values.email,
          password: values.values.password,
        }
      );
      console.log(response);
      const token = response.data.data.token;
      setAuth({ token });
      navigate('/', { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message || 'Login failed!');
      alert('Login failed!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <CustomField
          name="email"
          label="Email"
          fieldType="email"
          validate={validateEmail}
          required
          placeholder="Enter your email"
        />
        <CustomField
          name="password"
          label="Password"
          fieldType="password"
          required
          placeholder="Enter your password"
        />
        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </Form>
    </div>
  );
}

export default Login;
