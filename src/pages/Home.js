import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { ModalSuccessPopup } from "slarabi-components";
import states from "../stateApi";
import "../index.css";
import Calendrier from "../components/Calendrier";
import SelectComponent from "../components/SelectComponent";
import { modalSlice } from "../reducers/modal.reducer";
import { employeSlice } from "../reducers/employe.reducer";

export default function Home() {
  // Utilisation de react-router-dom pour la navigation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Sélection de l'état modal et de l'état des employés depuis Redux
  const modalState = useSelector((state) => state.modal);
  const employeeState = useSelector((state) => state.employes);

  // Gestion des états liés à l'affichage des calendriers de date
  const [showDate, setShowDate] = useState({
    birthCalendar: false,
    dateCalendar: false,
  });

  // Gestion des états des dates sélectionnées
  const [selectedDate, setSelectedDate] = useState({
    birthdayDate: "",
    startDateState: "",
  });

  // Liste des départements
  const departements = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  // Utilisation de useRef pour accéder aux champs de saisie
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const dateOfBirthInput = useRef();
  const startDateInput = useRef();
  const departmentSelect = useRef();
  const stateSelect = useRef();
  const streetInput = useRef();
  const cityInput = useRef();
  const zipCodeInput = useRef();
  const currentDate = new Date();

  // Récupération des employés depuis le stockage local lors du chargement initial
  useEffect(() => {
    const existingEmployees =
      JSON.parse(localStorage.getItem("NewEmployee")) || [];
    dispatch(employeSlice.actions.employe(existingEmployees));
  }, [dispatch]);

  // Soumission du formulaire
  const submitForm = (e) => {
    e.preventDefault();

    // Validation des champs du formulaire
    if (
      !firstNameInput.current.value ||
      !lastNameInput.current.value ||
      !dateOfBirthInput.current.value ||
      !startDateInput.current.value ||
      !streetInput.current.value ||
      !cityInput.current.value ||
      !zipCodeInput.current.value
    ) {
      dispatch(modalSlice.actions.formError(true));
      return;
    }

    dispatch(modalSlice.actions.formError(false));

    // Mise en forme de la date de début avec la date actuelle
    startDateInput.current.value = format(currentDate, "dd/MM/yyyy");

    // Création d'un nouvel employé avec les données du formulaire
    const newEmployee = {
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      dateOfBirth: dateOfBirthInput.current.value,
      startDate: startDateInput.current.value,
      street: streetInput.current.value,
      city: cityInput.current.value,
      zipCode: zipCodeInput.current.value,
      stateValue: stateSelect.current.value,
      departmentValue: departmentSelect.current.value,
    };

    // Vérification si l'employé existe déjà
    const employeeExists = employeeState.employeState.some(
      (emp) =>
        emp.firstName.toLowerCase() === newEmployee.firstName.toLowerCase() &&
        emp.lastName.toLowerCase() === newEmployee.lastName.toLowerCase()
    );

    if (!employeeExists) {
      // Stockage dans le localStorage et mise à jour de l'état des employés
      const updatedEmployees = [...employeeState.employeState, newEmployee];
      localStorage.setItem("NewEmployee", JSON.stringify(updatedEmployees));
      dispatch(employeSlice.actions.employe(updatedEmployees));
      dispatch(modalSlice.actions.showModal(true));
    } else {
      dispatch(employeSlice.actions.existEmploye(true));
    }
  };

  // Redirection vers la liste de tous les employés
  const allEmployee = () => {
    navigate("/employeesList");
  };

  // Fermeture du modal
  const closeModal = () => {
    dispatch(modalSlice.actions.showModal(false));
  };

  // Gestion du clic sur les boutons de date
  const handleButtonClickDate = (type, date) => {
    const minAge = 20;
    const age = currentDate.getFullYear() - date.getFullYear();

    if (type === "dateOfBirth") {
      if (age >= minAge) {
        setSelectedDate((prevState) => ({
          ...prevState,
          birthdayDate: format(date, "dd/MM/yyyy"),
        }));
        setShowDate((prevShowDate) => ({
          ...prevShowDate,
          birthCalendar: false,
        }));
        console.log("L'âge est supérieur à", minAge);
      } else {
        console.log("L'âge est inférieur à", minAge);
      }
    }

    if (type === "startDate") {
      setSelectedDate((prevState) => ({
        ...prevState,
        startDateState: format(date, "dd/MM/yyyy"),
      }));
      setShowDate((prevShowDate) => ({
        ...prevShowDate,
        dateCalendar: false,
      }));
    }
  };

  // Affichage/masquage des calendriers de date
  const toggleDateCalendar = (type) => {
    setShowDate({
      birthCalendar: type === "birthCalendar",
      dateCalendar: type === "dateCalendar",
    });
  };
  return (
    <div className="App">
      <div className="container">
      <Link to="/employeesList" >
        View current employes
      </Link>
        <h1>Create Employee</h1>
        <form onSubmit={submitForm}>
          <label>First Name</label>
          <input ref={firstNameInput} type="text" id="first-name" />
          <label>Last Name</label>
          <input ref={lastNameInput} type="text" id="last-name" />
          <label>Date of Birth</label>
          <input
            ref={dateOfBirthInput}
            id="date-of-birth"
            type="text"
            value={selectedDate.birthdayDate}
            onChange={(e) => setSelectedDate.birthdayDate(e.target.value)}
            onClick={() => toggleDateCalendar("birthCalendar")}
          />
          {showDate.birthCalendar && (
            <Calendrier
              onButtonClick={(date) =>
                handleButtonClickDate("dateOfBirth", date)
              }
            />
          )}
          <label>Start Date</label>
          <input
            ref={startDateInput}
            id="start-date"
            type="text"
            defaultValue={selectedDate.startDateState}
            onClick={() => toggleDateCalendar("dateCalendar")}
          />
          {showDate.dateCalendar && (
            <Calendrier
              onButtonClick={(date) => handleButtonClickDate("startDate", date)}
            />
          )}
          <label>Adresse</label>
          <fieldset className="address">
            <label>Street</label>
            <input ref={streetInput} id="street" type="text" />
            <label>City</label>
            <input ref={cityInput} id="city" type="text" />
            <label>State</label>
            <SelectComponent
              options={states}
              name="state"
              id="state"
              optionSelected={stateSelect}
            />
            <label>Zip Code</label>
            <input ref={zipCodeInput} id="zip-code" type="number" />
          </fieldset>
          <label>Department</label>
          <SelectComponent
            options={departements}
            name="department"
            id="department"
            optionSelected={departmentSelect}
          />
          {modalState.isFormIncomplete &&
          !modalState.show &&
          !employeeState.existEmployeState ? (
            <div className="erreur">Veuillez remplir le formulaire</div>
          ) : null}
          {employeeState.existEmployeState ? (
            <div className="erreur">Cet employé existe déjà</div>
          ) : null}
          <button className="buttonSubmit" type="submit">
            Save
          </button>
        </form>
        <ModalSuccessPopup
          close={closeModal}
          redirection={allEmployee}
          show={modalState.show}
          erreur={modalState.isFormIncomplete}
        />
      </div>
    </div>
  );
}
