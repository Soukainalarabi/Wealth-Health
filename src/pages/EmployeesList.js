import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import TableEmployee from '../components/TableEmployee';
import { employeSlice } from '../reducers/employe.reducer';
/* eslint-disable */

export default function EmployeesList() {
  const employeeState = useSelector(state => state.employes);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const tableHead = {
    firstName: 'Nom',
    lastName: 'Prénom',
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
        dispatch(employeSlice.actions.employe(parsedData));
        dispatch(employeSlice.actions.filteredEmployees(parsedData));
      }
    }
  }, []);

  useEffect(() => {
    const searchValueLower = searchValue.toLowerCase();
    const filtered = employeeState.employeState.filter(
      employee =>
        employee.firstName.toLowerCase().includes(searchValueLower) ||
        employee.lastName.toLowerCase().includes(searchValueLower) ||
        employee.city.toLowerCase().includes(searchValueLower) ||
        employee.zipCode.toLowerCase().includes(searchValueLower) ||
        employee.stateValue.toLowerCase().includes(searchValueLower) ||
        employee.departmentValue.toLowerCase().includes(searchValueLower),
    );

    dispatch(employeSlice.actions.filteredEmployees(filtered));
  }, [employeeState.employeState, searchValue]);

  const indexOfLastEmployee =
    employeeState.currentPageState * employeeState.employeesPerPageState;
  const indexOfFirstEmployee =
    indexOfLastEmployee - employeeState.employeesPerPageState;
  const currentEmployees = employeeState.filteredEmployeesState.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee,
  );

  const prevPage = () => {
    if (employeeState.currentPageState > 1) {
      dispatch(
        employeSlice.actions.currentPage(employeeState.currentPageState - 1),
      );
    }
  };

  const nextPage = () => {
    if (indexOfLastEmployee < employeeState.filteredEmployeesState.length) {
      dispatch(
        employeSlice.actions.currentPage(employeeState.currentPageState + 1),
      );
    }
  };

  if (employeeState.employeState.length === 0) {
    return (
      <div className="container">
        <h1>No employees found</h1>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div className="container-flex">
      <div className="input-search">
        <label>Search</label>
        <input
          type="search"
          id="search"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
      </div>
      <TableEmployee data={currentEmployees} head={tableHead} />
      <div className="tab-footer">
        <p>
          
          <span> Showing 1 to {employeeState.filteredEmployeesState.length}
          </span>
          <span>of {employeeState.employeState.length} entries</span>
          
          {employeeState.filteredEmployeesState.length !==
            employeeState.employeState.length
            ? ` (filtered from 
               ${employeeState.employeState.length}
                total entries)`
            : ''}
        </p>
        <button type="button" onClick={prevPage}>
          {' '}
          Previous
        </button>
        <button type="button">{employeeState.currentPageState}</button>
        <button type="button" onClick={nextPage}>
          {' '}
          Next
        </button>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
}
