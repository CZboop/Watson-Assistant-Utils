import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {useState, createContext} from 'react';
import Home from './components/Home';
import FindNodeIntent from './components/FindNodeIntent';
import FindIntentNode from './components/FindIntentNode';
import FindJumpTos from './components/FindJumpTos';
import ErrorModal from './components/ErrorModal';

export const ModalContext = createContext()

function App() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Error");
  const [modalMessage, setModalMessage] = useState("Something went wrong");

  // const toggleModal = () => {
  //     setModalOpen(!modalOpen);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <ModalContext.Provider value={{setModalOpen, setModalTitle, setModalMessage}}>
          <ErrorModal modalOpen={modalOpen} modalTitle={modalTitle} modalMessage={modalMessage} />
        <BrowserRouter>
        <Navbar />
          <Routes>
          <Route index path='home' element={<Home/>}/>
          <Route path='' element={ <Navigate to="/home" /> }/>
          <Route path='find-intent' element={<FindNodeIntent />}/>
          <Route path='find-nodes' element={<FindIntentNode />}/>
          <Route path='find-jumps' element={<FindJumpTos />}/>
          <Route path='*' element={<Navigate to="/home" />}/> 
          </Routes>
        </BrowserRouter>
        </ModalContext.Provider>
      </header>
    </div>
  );
}

export default App;
