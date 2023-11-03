import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EmployeesList from './pages/EmployeesList';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <React.StrictMode>
      <Router>

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/employeesList" element={<EmployeesList />} />

        </Routes>

      </Router>
    </React.StrictMode>
  );
}
