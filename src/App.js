import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import EmployeesList from './pages/EmployeesList';
import Navigation from './components/Navigation';
import Erreur from './components/Erreur';

export default function App() {
  return (
    <div className="container-flex">
      <React.StrictMode>
        <HashRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employeesList" element={<EmployeesList />} />
            <Route path="*" element={<Erreur />} />
          </Routes>
        </HashRouter>
      </React.StrictMode>
    </div>
  );
}
