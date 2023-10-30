import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { states } from '../stateApi';
import '../index.css';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import SelectComponent from './SelectComponent';
import ModalEmployee from './ModalEmployee';
import { EmployeeContext } from '../utils/EmployeeContext';

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isFormCompleted, setFormCompleted] = useState(false);
  const [showDateOfBirthCalendar, setShowDateOfBirthCalendar] = useState(false);
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const departements = ["Sales", "Marketing", "Engineering", "Human Resources", "Legal"];
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const dateOfBirthInput = useRef();
  const startDateInput = useRef();
  const departmentSelect = useRef();
  const stateSelect = useRef();
  const streetInput = useRef();
  const cityInput = useRef();
  const zipCodeInput = useRef();
  const minAge = 20;
  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - minAge);
  const navigate = useNavigate();
  const { addEmployee, employees } = useContext(EmployeeContext); 
  const submitForm = (e) => {
    e.preventDefault();
    if (!firstNameInput.current.value || !lastNameInput.current.value || !dateOfBirthInput.current.value || !startDateInput.current.value || !streetInput.current.value || !cityInput.current.value || !zipCodeInput.current.value) {
      setFormCompleted(true);
      setShowModal(false);
      return;
    } else {
      setFormCompleted(false);
      setShowModal(true);
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

    if (Array.isArray(employees)) {      
      setShowModal(true);
      setFormCompleted(false);
      addEmployee(newEmployee);
    }
  };

  const allEmployee = () => {
    navigate("/employeesList");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleDateOfBirthCalendar = () => {
    setShowDateOfBirthCalendar(!showDateOfBirthCalendar);
    setShowStartDateCalendar(false);
  };

  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowDateOfBirthCalendar(false);
  };
  return (
    <div className="App">
      <div className="container">
        <h2>Create Employee</h2>
        <form onSubmit={submitForm} >
          <label >First Name</label>
          <input ref={firstNameInput} type="text" id="first-name" />
          <label >Last Name</label>
          <input ref={lastNameInput} type="text" id="last-name" />
          <label >Date of Birth</label>
          <input ref={dateOfBirthInput} id="date-of-birth" type="text" onClick={toggleDateOfBirthCalendar} />
          {showDateOfBirthCalendar && (
            <Calendar
              onChange={(date) => {
                if (date <= currentDate) {
                  setSelectedDate(date);
                  dateOfBirthInput.current.value = format(date, 'dd/MM/yyyy');
                }
                toggleDateOfBirthCalendar();
              }}
              value={selectedDate}
            />
          )}
          <label>Start Date</label>
          <input ref={startDateInput} id="start-date" type="text" onClick={toggleStartDateCalendar} />
          {showStartDateCalendar && (
            <Calendar
              onChange={(date) => {
                setSelectedDate(date);
                startDateInput.current.value = format(date, 'dd/MM/yyyy');
                toggleStartDateCalendar();
              }}
              value={selectedDate}
            />
          )}
          <label >Adresse</label>
          <fieldset className="address">
            <label >Street</label>
            <input ref={streetInput} id="street" type="text" />
            <label>City</label>
            <input ref={cityInput} id="city" type="text" />
            <label>State</label>
            <SelectComponent options={states} name="state" id="state" optionSelected={stateSelect} key={stateSelect.abbreviation} />
            <label>Zip Code</label>
            <input ref={zipCodeInput} id="zip-code" type="number" />
          </fieldset>
          <label>Department</label>
          <SelectComponent options={departements} name="department" id="department" optionSelected={departmentSelect} />
          {isFormCompleted && !showModal ? (<div className="erreur">Veuillez remplir le formulaire</div>) : null}
          <button className="buttonSubmit" type="submit">Save</button>
        </form>
        <ModalEmployee
          close={closeModal}
          redirection={allEmployee}
          show={showModal}
          erreur={isFormCompleted}
        />
      </div>
    </div>
  );
}