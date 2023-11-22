import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ModalSuccessPopup } from 'slarabi-components';
import states from '../stateApi';
import '../index.css';
import Calendrier from '../components/Calendrier';
// import Modal from '../components/Modal';
import SelectComponent from '../components/SelectComponent';
import { modalSlice } from '../reducers/modal.reducer';
import { employeSlice } from '../reducers/employe.reducer';
/* eslint-disable */

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalState = useSelector(state => state.modal);
  const employeeState = useSelector(state => state.employes);
  const [showDate, setShowDate] = useState({
    birthCalendar: false,
    dateCalendar: false,
  });
  const [selectedDate, setSelectedDate] = useState({
    birthdayDate: '',
    startDateState: '',
  });

  const departements = [
    'Sales',
    'Marketing',
    'Engineering',
    'Human Resources',
    'Legal',
  ];
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
    const existingEmployees =
      JSON.parse(localStorage.getItem('NewEmployee')) || []; // Initialize as an empty array

    dispatch(employeSlice.actions.employe(existingEmployees));
  }, []);

  const submitForm = e => {
    e.preventDefault();
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
    const employeeExists = employeeState.employeState.some(
      emp =>
        emp.firstName === newEmployee.firstName &&
        emp.lastName === newEmployee.lastName,
    );

    if (!employeeExists) {
      // si l'employe n'a pas ete trouvé on le stock dans le loCal
      const updatedEmployees = [...employeeState.employeState, newEmployee];
      localStorage.setItem('NewEmployee', JSON.stringify(updatedEmployees));
      dispatch(employeSlice.actions.employe(updatedEmployees));
      dispatch(modalSlice.actions.showModal(true));
    } else {
      dispatch(employeSlice.actions.existEmploye(true));
    }
  };

  const allEmployee = () => {
    navigate('/employeesList');
  };

  const closeModal = () => {
    dispatch(modalSlice.actions.showModal(false));
  };
  const handleButtonClickDate = (type, date) => {
    const minAge = 20;
    const age = currentDate.getFullYear() - date.getFullYear();

    if (type === 'dateOfBirth') {
      if (age >= minAge) {
        setSelectedDate(prevState => ({
          ...prevState,
          birthdayDate: format(date, 'dd/MM/yyyy'),
        }));
        // Close the date calendar for 'dateOfBirth'
        setShowDate(prevShowDate => ({
          ...prevShowDate,
          birthCalendar: false,
        }));
        console.log("L'âge est supérieur à", minAge);
      } else {
        console.log("L'âge est inférieur à", minAge);
      }
    }

    if (type === 'startDate') {
      setSelectedDate(prevState => ({
        ...prevState,
        startDateState: format(date, 'dd/MM/yyyy'),
      }));
      // Close the date calendar for 'StartDate'
      setShowDate(prevShowDate => ({
        ...prevShowDate,
        dateCalendar: false,
      }));
    }
  };
  const toggleDateCalendar = type => {
    setShowDate({
      birthCalendar: type === 'birthCalendar',
      dateCalendar: type === 'dateCalendar',
    });
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
            value={selectedDate.birthdayDate}
            onChange={e => setSelectedDate.birthdayDate(e.target.value)}
            onClick={() => toggleDateCalendar('birthCalendar')}
          />
          {showDate.birthCalendar && (
            <Calendrier
              onButtonClick={date => handleButtonClickDate('dateOfBirth', date)}
            />
          )}
          <label>Start Date</label>
          <input
            ref={startDateInput}
            id="start-date"
            type="text"
            defaultValue={selectedDate.startDateState}
            onClick={() => toggleDateCalendar('dateCalendar')}
          />
          {showDate.dateCalendar && (
            <Calendrier
              onButtonClick={date => handleButtonClickDate('startDate', date)}
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
