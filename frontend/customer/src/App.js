import React from 'react';
import CustomerLayout from './shared/components/Layout';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Properties from './pages/properties';
import PropertyType from './pages/propertyType';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Navigate to="/properties" replace />} />
          <Route index path="/properties" element={<Properties/>} />
          <Route path="/property-type/:id" element={<PropertyType/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
