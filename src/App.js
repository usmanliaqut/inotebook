import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteStates';
import Alert from './components/Alert';
import Login from './components/Login';
import Sign_up from './components/Sign_up';
import React, { useState } from 'react';

function App() {
  const [alert, setalert] = useState(null);
  const showAlert =(message, type) =>{
    setalert(
      {
        msg:message,
        type:type
      }

    )
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
        <Route    path='/' element={<Home showAlert={showAlert} />}> </Route> 
        <Route exact path='/about' element={<About />}> </Route> 
        <Route exact  path='/login' element={<Login  showAlert={showAlert}/>}> </Route> 
        <Route exact path='/signup' element={<Sign_up showAlert={showAlert} />}> </Route> 
    
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
