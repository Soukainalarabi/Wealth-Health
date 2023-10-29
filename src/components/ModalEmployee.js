import React from 'react';
import closeButton from '../assets/cross.png';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modalSlice } from '../reducers/modal.reducer';

export default function ModalEmployee() {
    const modalState=useSelector((state)=>state.modal)
    const dispatch=useDispatch();
    const navigate=useNavigate()
    const close=()=>{
        dispatch(modalSlice.actions.showModal(false));
    }
    const redirection=()=>{
        navigate("/employeesList")
    }
  return (
     modalState && modalState.show  && !modalState.isFormIncomplete ?(
        <div className="centered">
<div className='modal'>
      <div className="modal-header">
        <h1 className="modal-title">We have received your registration, you can now see the list of employees</h1>
        <img src={closeButton} alt="close button" onClick={close} />
      </div>
      <div className="modal-body">
        <button type="button" className="direction" onClick={redirection}>check list</button>
        <button type="button" className="close" onClick={close}>Close</button>
      </div>
    </div>
    </div>
    ):null
    
  );
  
}