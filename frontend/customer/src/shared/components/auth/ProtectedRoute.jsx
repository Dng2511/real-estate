
import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export default function ProtectedRoute({ children }) {
    const { user } = React.useContext(AuthContext);
    return user ? children : <Navigate to="/not-logged-in" replace />;
}