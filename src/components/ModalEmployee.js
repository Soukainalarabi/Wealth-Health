import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

export default function ModalEmployee() {
    const [showModal, setShowModal] = useState(false);

    return (

<Modal show={showModal} onHide={() => setShowModal(false)}>
<Modal.Header closeButton>
  <Modal.Title>Employee Created</Modal.Title>
</Modal.Header>
</Modal>
    );
}