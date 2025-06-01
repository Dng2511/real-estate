import React from 'react';
import CustomerLayout from './shared/components/Layout';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Properties from './pages/properties';
import PropertyType from './pages/propertyType';
import PropertyDetail from './pages/propertyDetail';
import NotLoggedIn from './pages/NotLoggedIn';
import ProtectedRoute from './shared/components/auth/ProtectedRoute';
import { AuthProvider } from './shared/components/auth/AuthContext';
import Login from './pages/Login';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<Navigate to="/properties" replace />} />
            <Route path="not-logged-in" element={<NotLoggedIn />} />
            <Route index path="/properties" element={<Properties />} />
            <Route index path="/properties/:id" element={<PropertyDetail />} />
            <Route path="/property-type/:id" element={<PropertyType />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
