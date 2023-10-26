import React from 'react';
import closeButton from '../assets/cross.png';

export default function ModalEmployee({ close, redirection,show,erreur}) {
  return (
    show && !erreur ?(
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