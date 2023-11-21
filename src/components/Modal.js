import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import closeButton from '../assets/cross.WebP';

// Define styled components for styling the modal
const StyledModal = styled.div`
  background-color: #6e8511;
  vertical-align: middle;
  position: relative;
  z-index: 2;
  max-width: 500px;
  box-sizing: border-box;
  width: 90%;
  background: #fff;
  padding: 15px 30px;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -o-border-radius: 8px;
  -ms-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 0 0 10px #000;
  -moz-box-shadow: 0 0 10px #000;
  -o-box-shadow: 0 0 10px #000;
  -ms-box-shadow: 0 0 10px #000;
  box-shadow: 0 0 10px #000;
  text-align: left;
`;
const CenteredModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const ModalTitle = styled.h1`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalHeader = styled.div`
  border-bottom: none !important;
  display: flex;
  align-items: baseline !important;
`;
const ModalBodyButton = styled.button`
  background-color: #6e8511 !important;
  border: none !important;
  display: flex;
  justify-content: space-evenly;
  margin-left: 4px;
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: row;
`;
// Define the Modal component

export default function Modal({ close, redirection, show, erreur }) {
  return show && !erreur ? (
    <CenteredModal className="centered">
      <StyledModal className="modal">
        <ModalHeader className="modal-header">
          <ModalTitle className="modal-title">
            We have received your registration, you can now see the list of
            employees
          </ModalTitle>
          <button type="button" onClick={close}>
            <img src={closeButton} alt="close button" />{' '}
          </button>
        </ModalHeader>
        <ModalBody className="modal-body">
          <ModalBodyButton
            type="button"
            className="direction"
            onClick={redirection}
          >
            check list
          </ModalBodyButton>
          <ModalBodyButton type="button" className="close" onClick={close}>
            Close
          </ModalBodyButton>
        </ModalBody>
      </StyledModal>
    </CenteredModal>
  ) : null;
}
Modal.propTypes = {
  close: PropTypes.func,
  redirection: PropTypes.func,
  show: PropTypes.bool,
  erreur: PropTypes.bool,
};
Modal.defaultProps = {
  close: '',
  redirection: '',
  show: false,
  erreur: false,
};
