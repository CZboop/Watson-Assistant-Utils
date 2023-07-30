import React from 'react';
import './ErrorModal.css';

function ErrorModal({title, message, toggleModal, modalOpen}) {
    if (!modalOpen) {
        return null;
    }

  return (
    <div className='error-modal'>
        <div className='overlay' onClick={() => toggleModal()}>
            <div className='modal-content'>
                <h2>{title}</h2>
                <button onClick={() => toggleModal()} id='exit-button'>X</button>
                <p>{message}</p>
            </div>
        </div>
    </div>
  )
}

export default ErrorModal;