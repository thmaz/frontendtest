import React from 'react';
import './Modal.css';
import ResultDetails from './ResultDetails';

const Modal = ({ result, onClose }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Resultaat Details</h2>
        <ResultDetails resultId={result.id} />
      </div>
    </div>
  );
};

export default Modal;
