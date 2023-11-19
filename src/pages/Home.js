import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  ModalSuccessPopup, SelectComponent, Calendrier,
} from 'slarabi-components';
import { states } from '../stateApi';
import '../index.css';
// import Calendrier from '../components/Calendrier';

export default function Home() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isFormCompleted, setFormCompleted] = useState(false);
  const [showDateOfBirthCalendar, setShowDateOfBirthCalendar] = useState(false);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [employees, setEmployees] = useState([]); // Initialize 'employees' as an empty array
  const [existEmploye, setExistEmploye] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedBirthdayDate, setSelectedBirthdayDate] = useState('');
  const departements = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];
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

  // Retrieve employees from localStorage
  useEffect(() => {
    const existingEmployees = JSON.parse(localStorage.getItem('NewEmployee')) || []; // Initialize as an empty array
    setEmployees(existingEmployees);
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (
      !firstNameInput.current.value
      || !lastNameInput.current.value
      || !dateOfBirthInput.current.value
      || !startDateInput.current.value
      || !streetInput.current.value
      || !cityInput.current.value
      || !zipCodeInput.current.value
    ) {
      setFormCompleted(true);

      return;
    }
    startDateInput.current.value = format(currentDate, 'dd/MM/yyyy');
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

    // Check if the employee already exists
    const employeeExists = employees.some(
      (emp) => emp.firstName === newEmployee.firstName
        && emp.lastName === newEmployee.lastName,
    );

    if (!employeeExists) { // si l'employe n'a pas ete trouvé on le stock dans le loCal
      const updatedEmployees = [...employees, newEmployee];
      localStorage.setItem('NewEmployee', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
      setShowModal(true);
    } else {
      setExistEmploye(true);
    }
  };

  const allEmployee = () => {
    navigate('/employeesList');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDateOfBirthCalendar = () => {
    setShowDateOfBirthCalendar(!showDateOfBirthCalendar);
    setShowStartDateCalendar(false);
  };

  const handleButtonClick = (startDate) => {
    setSelectedStartDate(
      `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear()}`,
    );
  };

  const handleButtonClickBirth = (dateOfBirth) => {
    const minAge = 20;
    const age = currentDate.getFullYear() - dateOfBirth.getFullYear();

    if (age >= minAge) {
      setSelectedBirthdayDate(
        `${dateOfBirth.getDate()}/${dateOfBirth.getMonth() + 1}/${dateOfBirth.getFullYear()}`,
      );
      console.log("L'âge est supérieur à", minAge);
    } else {
      console.log("L'âge est inférieur à", minAge);
    }
  };

  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowDateOfBirthCalendar(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h2>Create Employee</h2>
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
            value={selectedBirthdayDate}
            onChange={(e) => setSelectedBirthdayDate(e.target.value)}
            onClick={toggleDateOfBirthCalendar}
          />
          {showDateOfBirthCalendar && <Calendrier onButtonClick={handleButtonClickBirth} />}
          <label>Start Date</label>
          <input
            ref={startDateInput}
            id="start-date"
            type="text"
            defaultValue={selectedStartDate}
            onClick={toggleStartDateCalendar}
          />
          {showStartDateCalendar && <Calendrier onButtonClick={handleButtonClick} />}
          <label>Adresse</label>
          <fieldset className="address">
            <label>Street</label>
            <input ref={streetInput} id="street" type="text" />
            <label>City</label>
            <input ref={cityInput} id="city" type="text" />
            <label>State</label>
            <SelectComponent options={states} name="state" id="state" optionSelected={stateSelect} />
            <label>Zip Code</label>
            <input ref={zipCodeInput} id="zip-code" type="number" />
          </fieldset>
          <label>Department</label>
          <SelectComponent options={departements} name="department" id="department" optionSelected={departmentSelect} />
          {isFormCompleted && !showModal && !existEmploye ? (
            <div className="erreur">Veuillez remplir le formulaire</div>
          ) : null}
          {!isFormCompleted && !showModal && existEmploye ? (
            <div className="erreur">Cet employé existe déjà</div>
          ) : null}
          <button className="buttonSubmit" type="submit">
            Save
          </button>
        </form>
        <ModalSuccessPopup
          close={closeModal}
          redirection={allEmployee}
          show={showModal}
          erreur={isFormCompleted}
        />
      </div>
    </div>
  );
}
