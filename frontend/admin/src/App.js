import React from 'react';
import AdminLayout from './shared/components/Layout';
import 'antd/dist/reset.css'; // cần cài Ant Design
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyTypes from './pages/propertyTypes';
import Properties from './pages/properties';
import Appointments from './pages/appointments';

const App = () => {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/property-types" element={<PropertyTypes/>} />
          <Route path="/properties" element={<Properties/>} />
          <Route path='/appointments' element={<Appointments/>}/>
        </Routes>
      </AdminLayout>
    </Router>
  );
};

export default App;
