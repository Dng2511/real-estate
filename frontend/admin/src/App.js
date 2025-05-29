import React from 'react';
import AdminLayout from './shared/components/Layout';
import 'antd/dist/reset.css'; // cần cài Ant Design
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyTypes from './pages/propertyTypes';
import Properties from './pages/properties';

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/property-types" element={<PropertyTypes/>} />
          <Route path="/properties" element={<Properties/>} />

        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;
