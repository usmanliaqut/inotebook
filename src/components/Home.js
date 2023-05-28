import React from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Notes from './Notes';
import AddNote from './AddNote';
import Login from './Login';
const Home = (props) => {
const  {showAlert}=props;
  return (
    <div>
       <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
