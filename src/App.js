import React from 'react';
import { BrowserRouter as Router ,Routes , Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home'
import EmployeesList from './components/EmployeesList';
import Navigation from './components/Navigation';

export default function App() {
  return ( 
     <React.StrictMode>
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employeesList" element={<EmployeesList />} />

        {/* <Route path="/survey" element={<Survey />} /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);
}






