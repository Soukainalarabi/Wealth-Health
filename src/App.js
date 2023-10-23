import React from 'react';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import Home from './components/Home'
import EmployeesList from './components/EmployeesList';

export default function App() {
  return ( 
     <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeesList" element={<EmployeesList />} />

        {/* <Route path="/survey" element={<Survey />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
}






