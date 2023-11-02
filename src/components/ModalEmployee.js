import React from 'react';
import PropTypes from 'prop-types';
import closeButton from '../assets/cross.png';

export default function ModalEmployee({
  close, redirection, show, erreur,
}) {
  return (
    show && !erreur ? (
      <div className="centered">
        <div className="modal">
          <div className="modal-header">
            <h1 className="modal-title">We have received your registration, you can now see the list of employees</h1>
            <button type="button" onClick={close}>
              <img src={closeButton} alt="close button" />
              {' '}
            </button>

          </div>
          <div className="modal-body">
            <button type="button" className="direction" onClick={redirection}>check list</button>
            <button type="button" className="close" onClick={close}>Close</button>
          </div>
        </div>
      </div>
    ) : null

  );
}
ModalEmployee.propTypes = {
  close: PropTypes.func,
  redirection: PropTypes.func,
  show: PropTypes.bool,
  erreur: PropTypes.bool,
};
ModalEmployee.defaultProps = {
  close: '',
  redirection: '',
  show: false,
  erreur: false,
};
