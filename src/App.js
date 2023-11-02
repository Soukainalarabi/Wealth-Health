import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import EmployeesList from './components/EmployeesList';
import Navigation from './components/Navigation';
import Calendrier from './components/Calendrier';

export default function App() {
  return (
    <React.StrictMode>
      <Router>

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/employeesList" element={<EmployeesList />} />
          <Route path="/calendrier" element={<Calendrier />} />

        </Routes>

      </Router>
    </React.StrictMode>
  );
}
