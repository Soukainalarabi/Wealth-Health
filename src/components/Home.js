import React, { useRef, useState } from 'react';
import { useNavigate,Link } from "react-router-dom";

import { states } from '../stateApi';
import '../index.css';

export default function Home() {
  const [created, setCreated] = useState(false)
  const navigate = useNavigate()
  const [isFormCompleted, setFormCompled] = useState(false)
  const firstNameInput = useRef();
  const lastNameInput = useRef();
  const dateOfBirthInput = useRef();
  const startDateInput = useRef();
  const departmentSelect = useRef();
  const stateSelect = useRef();
  const streetInput = useRef();
  const cityInput = useRef();
  const zipCodeInput = useRef();
  const submitForm = (e) => {
    e.preventDefault()
    if (!firstNameInput.current.value || !lastNameInput.current.value || !dateOfBirthInput.current.value || !startDateInput.current.value || !streetInput.current.value || !cityInput.current.value || !zipCodeInput.current.value) {
      setFormCompled(true)
      return
    }
    setCreated(true);

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
    localStorage.setItem("NewEmployee", JSON.stringify(employee)) //enregister l'objet dans localStorage

    navigate("/employeesList")
  }

  return (
    <div className="App">
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employeesList">View Current Employees</Link>
        
        <h2>Create Employee</h2>
        <form onSubmit={submitForm}>
          <label >First Name</label>
          <input ref={firstNameInput} type="text" id="first-name" />
          <label >Last Name</label>
          <input ref={lastNameInput} type="text" id="last-name" />

          <label >Date of Birth</label>
          <input ref={dateOfBirthInput} id="date-of-birth" type="text" />

          <label >Start Date</label>
          <input ref={startDateInput} id="start-date" type="text" />

          <fieldset className="address">
            <legend>Address</legend>

            <label >Street</label>
            <input ref={streetInput} id="street" type="text" />

            <label>City</label>
            <input ref={cityInput} id="city" type="text" />

            <label>State</label>
            <select ref={stateSelect} name="state" id="state">
              {states.map((state) => (
                <option key={state.abbreviation} value={state.name}>{state.name}</option>
              ))}
            </select>

            <label>Zip Code</label>
            <input ref={zipCodeInput} id="zip-code" type="number" />
          </fieldset>

          <label>Department</label>
          <select ref={departmentSelect} name="department" id="department">
            <option key="sales">Sales</option>
            <option key="marketing">Marketing</option>
            <option key="engineering">Engineering</option>
            <option key="hr">Human Resources</option>
            <option key="legal">Legal</option>
          </select>
          <button type="submit">Save</button>

        </form>
        {isFormCompleted && !created ? (<div className="erreur">veuillez remplire le formulaire</div>) : null}
        {created ? (<div id="confirmation" className="modal">Employee Created!</div>) : null}

      </div>
    </div>
  )
}

