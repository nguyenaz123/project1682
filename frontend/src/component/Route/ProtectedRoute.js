import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, element: Component }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (loading) return <div>Loading...</div>;

  if (isAuthenticated===false) {
    return <Navigate to="/login" />;
  }
  if (isAdmin === true && user.role !== 'admin') {
    return <Navigate to="/NotAccess" />;
  }

  return Component;
};

export default ProtectedRoute;