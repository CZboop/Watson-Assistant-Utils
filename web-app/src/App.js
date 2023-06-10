import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import FindNodeIntent from './components/FindNodeIntent';
import FindIntentNode from './components/FindIntentNode';
import FindJumpTos from './components/FindJumpTos';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
        <Navbar />
          <Routes>
          <Route index path='home' element={<Home/>}/>
          <Route path='' element={ <Navigate to="/home" /> }/>
          <Route path='find-intent' element={<FindNodeIntent/>}/>
          <Route path='find-nodes' element={<FindIntentNode/>}/>
          <Route path='find-jumps' element={<FindJumpTos/>}/>
          <Route path='*' element={<Navigate to="/home" />}/> 
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
