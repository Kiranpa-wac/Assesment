import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authState } from '../authState';

function LogoutButton() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(authState);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (!user?.token) {
      console.error('No authentication token found.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL}/employee-portal/api/v1/settings/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.data.success) {
        // Clear user state and any stored authentication data
        setUser(null);
        // For example, if using localStorage:
        // localStorage.removeItem('authToken');

        // Redirect to the login page
        navigate('/login', { replace: true });
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className='mx-3 btn btn-danger'
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

export default LogoutButton;
