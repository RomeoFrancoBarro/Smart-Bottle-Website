import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('user'); // Check if user exists in localStorage
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login'); // Redirect to login page if not authenticated
    return null; // Return null to prevent rendering the component
  }

  return <Route {...rest} element={<Component />} />;
};

export default PrivateRoute;
