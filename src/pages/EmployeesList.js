import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TableEmploye,
} from 'slarabi-components';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem('NewEmployee');
    console.log(storedData);
    if (storedData) { // Vérifiez si des données existent dans localStorage
      const parsedData = JSON.parse(storedData);
      // Si les données sont un tableau, mettez-les à jour dans l'état local
      if (Array.isArray(parsedData)) {
        setEmployees(parsedData);
      }
    }
  }, []);

  return (
    !employees || employees.length === 0 ? (
      <div className="container">
        <h1>No employees found</h1>
        <Link to="/">Home</Link>
      </div>
    ) : (
      <div className="container">

        {' '}
        <TableEmploye data={employees} />
        <Link to="/">Home</Link>
      </div>
    )

  );
}
