import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { TableEmploye } from 'slarabi-components';
import TableEmployee from '../components/TableEmployee';

export default function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [searchValue, setSearchValue] = useState(''); // Utilisez un état local pour la valeur de recherche
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [employeesPerPage, setEmployeesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const tableHead = {
    firstName: 'Nom',
    lastName: 'Prenom',
    dateOfBirth: 'date naissance',
    startDate: 'Date début',
    street: 'Quartier',
    city: 'Ville',
    zipCode: 'Code postal',
    stateValue: 'Pays',
    departmentValue: 'Département',
  };
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
  // //nombre des pages = total nombre des employéés / taille de page + ()
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (indexOfLastEmployee < filteredEmployees.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return !employees || employees.length === 0 ? (
    <div className="container">
      <h1>No employees found</h1>
      <Link to="/">Home</Link>
    </div>
  ) : (
    <div className="container-flex">
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
      <TableEmployee data={currentEmployees} head={tableHead} />
      <div className="tab-footer">
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
            {currentEmployees.length}
            {' '}
            of
            {' '}
            {employees.length}
            {' '}
            entries
          </p>
        )}
        <button type="button" onClick={prevPage}> Previous</button>
        <button type="button">
          {' '}
          {currentPage}
        </button>

        <button type="button" onClick={nextPage}> Next</button>

      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
