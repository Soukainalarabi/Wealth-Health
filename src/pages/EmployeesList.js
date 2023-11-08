import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TableEmploye } from 'slarabi-components';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState(''); // Utilisez un état local pour la valeur de recherche
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('NewEmployee');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setEmployees(parsedData);
        setFilteredEmployees(parsedData);
      }
    }
  }, []);

  useEffect(() => {
    const searchValueLower = searchValue.toLowerCase();
    const filtered = employees.filter(
      (employee) => employee.firstName.toLowerCase().includes(searchValueLower)
        || employee.lastName.toLowerCase().includes(searchValueLower)
        || employee.city.toLowerCase().includes(searchValueLower)
        || employee.zipCode.toLowerCase().includes(searchValueLower)
        || employee.stateValue.toLowerCase().includes(searchValueLower)
        || employee.departmentValue.toLowerCase().includes(searchValueLower),
    );
    setFilteredEmployees(filtered);
  }, [employees, searchValue]);

  return !employees || employees.length === 0 ? (
    <div className="container">
      <h1>No employees found</h1>
      <Link to="/">Home</Link>
    </div>
  ) : (
    <div className="container">
      <div className="input-search">
        <label>Search</label>
        <input
          type="search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
           // Gérez l'événement onChange correctement
        />
      </div>
      <TableEmploye data={filteredEmployees} />
      {filteredEmployees.length !== employees.length ? (
        <p>
          Showing 1 to
          {' '}
          {filteredEmployees.length}
          {' '}
          of
          {' '}
          {employees.length}
          {' '}
          entries (filtered from
          {' '}
          {employees.length}
          {' '}
          total entries)
        </p>
      ) : (
        <p>
          Showing 1 to
          {' '}
          {employees.length}
          {' '}
          of
          {' '}
          {employees.length}
          {' '}
          entries
        </p>
      )}
      <Link to="/">Home</Link>
    </div>
  );
}
