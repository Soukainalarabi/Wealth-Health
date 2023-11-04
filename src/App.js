import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import EmployeesList from './pages/EmployeesList';
import Navigation from './components/Navigation';

export default function App() {
  return (
    <React.StrictMode>
      <HashRouter>

        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/employeesList" element={<EmployeesList />} />

        </Routes>

      </HashRouter>
    </React.StrictMode>
  );
}
