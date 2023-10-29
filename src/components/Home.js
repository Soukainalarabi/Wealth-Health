import React, { useRef, useState,useEffect } from 'react';
import { states } from '../stateApi';
import '../index.css';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import SelectComponent from './SelectComponent';
import ModalEmployee from './ModalEmployee';
import { modalSlice } from '../reducers/modal.reducer';
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const [showDateOfBirthCalendar, setShowDateOfBirthCalendar] = useState(false); //gestion de date
  const [showStartDateCalendar, setShowStartDateCalendar] = useState(false);// gestion de date
  const dispatch=useDispatch()
  const modalState=useSelector((state)=>state.modal)
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [employees, setEmployees] = useState([]); // gerer la liste des employees

  useEffect(() => {
    // Récupérer les employés existants depuis localStorage au chargement de la page
    const existingEmployees = JSON.parse(localStorage.getItem("NewEmployee"));
    if (Array.isArray(existingEmployees)) {
      setEmployees(existingEmployees);
    }
  }, []);
    const submitForm = (e) => {
    e.preventDefault();
    if (!firstNameInput.current.value || !lastNameInput.current.value || !dateOfBirthInput.current.value || !startDateInput.current.value || !streetInput.current.value || !cityInput.current.value || !zipCodeInput.current.value) {
      dispatch(modalSlice.actions.formError(true));


      return;
    }
    startDateInput.current.value = format(currentDate, 'dd/MM/yyyy');
    const employee = {
      firstName: firstNameInput.current.value,
      lastName: lastNameInput.current.value,
      dateOfBirth: dateOfBirthInput.current.value,
      startDate: startDateInput.current.value,
      street: streetInput.current.value,
      city: cityInput.current.value,
      zipCode: zipCodeInput.current.value,
      stateValue: stateSelect.current.value,
      departmentValue: departmentSelect.current.value
    }
  const updatedEmployees = [...employees, employee];  // Ajouter le nouvel employé au tableau
  localStorage.setItem("NewEmployee", JSON.stringify(updatedEmployees));  // Enregistrer le tableau mis à jour dans localStorage
  setEmployees(updatedEmployees);  // Mettre à jour l'état des employés
  dispatch(modalSlice.actions.showModal(true));

  }
  const toggleDateOfBirthCalendar = () => {
    setShowDateOfBirthCalendar(!showDateOfBirthCalendar);
    setShowStartDateCalendar(false); // Fermez le calendrier de la date de debut
  };

  const toggleStartDateCalendar = () => {
    setShowStartDateCalendar(!showStartDateCalendar);
    setShowDateOfBirthCalendar(false); // Fermez le calendrier de la date de naissance
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
          {modalState && modalState.isFormIncomplete && !modalState.show ? (
  <div className="erreur">veuillez remplir le formulaire</div>
) : null}
          <button className="buttonSubmit" type="submit">Save</button>

        </form>
      
        <ModalEmployee/>
      </div>
    </div>
  )
}

