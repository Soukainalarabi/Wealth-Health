import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TableEmployee from "../components/TableEmployee";
import { employeSlice } from "../reducers/employe.reducer";
import { modalSlice } from "../reducers/modal.reducer";

// Composant principal pour la liste des employés
export default function EmployeesList() {
  // Utilisation de react-redux pour accéder à l'état global
  const employeeState = useSelector((state) => state.employes);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState(""); // État local pour la valeur de recherche

  // Fonction pour réinitialiser l'état au retour à la page d'accueil
  const initialHome = () => {
    dispatch(modalSlice.actions.showModal(false)); // Cacher le modal si visible
    dispatch(modalSlice.actions.formError(false)); // Cacher le modal si visible
    dispatch(employeSlice.actions.existEmploye(false))
    setSearchValue(""); // Réinitialiser la valeur de recherche
  };

  // Entêtes de tableau pour l'affichage des employés
  const tableHead = {
    firstName: "Nom",
    lastName: "Prénom",
    dateOfBirth: "Date de naissance",
    startDate: "Date de début",
    street: "Quartier",
    city: "Ville",
    zipCode: "Code postal",
    stateValue: "Pays",
    departmentValue: "Département",
  };

  // useEffect pour récupérer les employés depuis le stockage local lors du chargement initial
  useEffect(() => {
    const storedData = localStorage.getItem("NewEmployee");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        dispatch(employeSlice.actions.employe(parsedData));
        dispatch(employeSlice.actions.filteredEmployees(parsedData));
      }
    }
  }, [dispatch]);

  // useEffect pour filtrer les employés en fonction de la valeur de recherche
  useEffect(() => {
    const searchValueLower = searchValue.toLowerCase();
    const filtered = employeeState.employeState.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(searchValueLower) ||
        employee.lastName.toLowerCase().includes(searchValueLower) ||
        employee.city.toLowerCase().includes(searchValueLower) ||
        employee.zipCode.toLowerCase().includes(searchValueLower) ||
        employee.stateValue.toLowerCase().includes(searchValueLower) ||
        employee.departmentValue.toLowerCase().includes(searchValueLower)
    );

    dispatch(employeSlice.actions.filteredEmployees(filtered));
  }, [employeeState.employeState, searchValue, dispatch]);

  // Calcul des indices pour la pagination
  const indexOfLastEmployee =
    employeeState.currentPageState * employeeState.employeesPerPageState;
  const indexOfFirstEmployee =
    indexOfLastEmployee - employeeState.employeesPerPageState;
  const currentEmployees = employeeState.filteredEmployeesState.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Fonction pour passer à la page précédente
  const prevPage = () => {
    if (employeeState.currentPageState > 1) {
      dispatch(
        employeSlice.actions.currentPage(employeeState.currentPageState - 1)
      );
    }
  };

  // Fonction pour passer à la page suivante
  const nextPage = () => {
    if (indexOfLastEmployee < employeeState.filteredEmployeesState.length) {
      dispatch(
        employeSlice.actions.currentPage(employeeState.currentPageState + 1)
      );
    }
  };

  return (
    <div className="container-flex">
      <Link to="/" onClick={initialHome}>
        Create a new employee
      </Link>
      <div className="input-search">
        <label>Search</label>
        <input
          type="search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <TableEmployee data={currentEmployees} head={tableHead} />
      <>
        {currentEmployees.length > 0 ? (
          <div className="tab-footer">
            <p>
              <span>
                {" "}
                Showing 1 to {employeeState.filteredEmployeesState.length}
              </span>
              <span>of {employeeState.employeState.length} entries</span>
              {employeeState.filteredEmployeesState.length !==
                employeeState.employeState.length
                ? ` (filtered from 
             ${employeeState.employeState.length}
              total entries)`
                : ""}
            </p>
            <button type="button" onClick={prevPage}>
              {" "}
              Previous
            </button>
            <button type="button">{employeeState.currentPageState}</button>
            <button type="button" onClick={nextPage}>
              {" "}
              Next
            </button>
          </div>

        ) : null}
      </>
    </div>
  );
}