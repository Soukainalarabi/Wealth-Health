import React from 'react';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import Home from './components/Home'
import EmployeesList from './components/EmployeesList';
import Navigation from './components/Navigation';
import { EmployeeProvider } from "./utils/EmployeeContext";


export default function App() {
  return ( 
     <React.StrictMode>
    <Router>
    <EmployeeProvider>

      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/employeesList" element={<EmployeesList />} />

      </Routes>
      </EmployeeProvider>

    </Router>
  </React.StrictMode>
);
}






