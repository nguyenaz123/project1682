import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated===false) {
    return <Navigate to="/login" />;
  }

  return Component;
};

export default ProtectedRoute;
