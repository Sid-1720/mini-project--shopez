import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router ,Switch ,Route } from "react-router-dom";
import Login from './Login';
import { auth } from './firebase';


function App() {

  /*useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The user is',authUser);

     if(authUser) {
        //the user is logged in
      } else{
        //the user is logged out
      }
      
    })
    return () => {
      
    }
  },*/
  return (
    <Router>
    <div className="app">
      <p>Hello world</p>
      <Switch>
        <Route path="/login">
          
          <Login />
        </Route>
      </Switch>
      

    
    </div>
    </Router>
  );
}

export default App;

