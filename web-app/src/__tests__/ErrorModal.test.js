import { render, fireEvent, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import React from "react"
import { useContext, useState } from "react"
import { ModalContext } from "../App"
import ErrorModal from "../components/ErrorModal";

test("test can open modal with default title and message", async () => {
    // given - an error modal component wrapped in context provider with a button that opens the modal
    const TestComponent = () => {
        const modalContext = useContext(ModalContext);
        const [modalOpen, setModalOpen] = useState(false);
        const [modalTitle, setModalTitle] = useState("Error");
        const [modalMessage, setModalMessage] = useState("Something went wrong");
  
        return <div>
            <ModalContext.Provider value={{setModalOpen, setModalTitle, setModalMessage}}>
          <ErrorModal modalOpen={modalOpen} modalTitle={modalTitle} modalMessage={modalMessage}/>
  
          <button onClick={() => setModalOpen(true)}>Open modal</button>
          </ModalContext.Provider>
        </div>
      }
      render(<TestComponent />);
    //   when - we click the button to open the modal, without updating the title and message
      fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    //   then - modal exists with the default error message and title
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
})

test("test can open modal with given title and message", async () => {
    // given - an error modal component wrapped in context provider with a button that opens the modal and updates the title and message
    const TestComponent = () => {
        const modalContext = useContext(ModalContext);
        const [modalOpen, setModalOpen] = useState(false);
        const [modalTitle, setModalTitle] = useState("Error");
        const [modalMessage, setModalMessage] = useState("Something went wrong");
  
        return <div>
            <ModalContext.Provider value={{setModalOpen, setModalTitle, setModalMessage}}>
          <ErrorModal modalOpen={modalOpen} modalTitle={modalTitle} modalMessage={modalMessage}/>
  
          <button onClick={() => {
            setModalTitle("Error 500")
            setModalMessage("Internal server error")
            setModalOpen(true)
            }}>Open modal</button>
          </ModalContext.Provider>
        </div>
      }
      render(<TestComponent />);
      //   when - we click the button to update info and open the modal
      fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    //   then - the modal opens with custom message and title
      expect(screen.getByText('Error 500')).toBeInTheDocument();
      expect(screen.getByText('Internal server error')).toBeInTheDocument();
})

test("test can close modal with x button", async () => {
    // given - an error modal component wrapped in context provider with a button that opens the modal
    const TestComponent = () => {
        const modalContext = useContext(ModalContext);
        const [modalOpen, setModalOpen] = useState(false);
        const [modalTitle, setModalTitle] = useState("Error");
        const [modalMessage, setModalMessage] = useState("Something went wrong");
  
        return <div>
            <ModalContext.Provider value={{setModalOpen, setModalTitle, setModalMessage}}>
          <ErrorModal modalOpen={modalOpen} modalTitle={modalTitle} modalMessage={modalMessage}/>
  
          <button onClick={() => setModalOpen(true)}>Open modal</button>
          </ModalContext.Provider>
        </div>
      }
      render(<TestComponent />);
    //   when - we click the button to open the modal
      fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    //   when - we click the X close button while then modal is open
      expect(screen.getByText('Error')).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: 'X' }));
    //   then - the modal closes and stops being in the document
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
})

test("test can close modal with clicking background", async () => {
    // given - an error modal component wrapped in context provider with a button that opens the modal
    const TestComponent = () => {
        const modalContext = useContext(ModalContext);
        const [modalOpen, setModalOpen] = useState(false);
        const [modalTitle, setModalTitle] = useState("Error");
        const [modalMessage, setModalMessage] = useState("Something went wrong");
  
        return <div>
            <ModalContext.Provider value={{setModalOpen, setModalTitle, setModalMessage}}>
          <ErrorModal modalOpen={modalOpen} modalTitle={modalTitle} modalMessage={modalMessage}/>
  
          <button onClick={() => setModalOpen(true)}>Open modal</button>
          </ModalContext.Provider>
        </div>
      }
      render(<TestComponent />);
    //   when - we click the button to open the modal
      fireEvent.click(screen.getByRole('button', { name: 'Open modal' }));
    //   when - we click the overlay in the background of the modal
      expect(screen.getByText('Error')).toBeInTheDocument();
      fireEvent.click(document.querySelector('.overlay'));
    //   then - the modal closes and is no longer found in the document
      expect(screen.queryByText('Error')).not.toBeInTheDocument();
})