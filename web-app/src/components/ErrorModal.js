import React, {useContext} from 'react';
import './ErrorModal.css';
import { ModalContext } from '../App';

function ErrorModal({modalOpen, modalTitle, modalMessage}) {
    const modalContext = useContext(ModalContext);
    if (modalOpen === false) {
        return null;
    }
    const closeModal = () => {
        modalContext.setModalOpen(false);
    }

  return (
    <div className='error-modal'>
        <div className='overlay' onClick={() => closeModal()}>
            <div className='modal-content'>
                <h2 id="modal-title">{modalTitle}</h2>
                <button onClick={() => closeModal()} id='exit-button'>X</button>
                <p id="modal-message">{modalMessage}</p>
            </div>
        </div>
    </div>
  )
}

export default ErrorModal;