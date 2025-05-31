import React from 'react';
import CustomerLayout from './shared/components/Layout';
import 'antd/dist/reset.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App = () => {
  return (
    <Router>
      <CustomerLayout>
        <Routes>
        </Routes>
      </CustomerLayout>
    </Router>
  );
};

export default App;
