import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import HomePage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import { myContext } from "../../contexts/UserContext";

function App() {
  //This is using context where I am checking if there is a User logged in for authorization and authentication
  const userObject = useContext(myContext);

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => <HomePage history={history} />}
        />
        {userObject ? null : (
          <Route
            path='/login'
            exact
            render={({ history }) => <LoginPage history={history} />}
          />
        )}
      </Switch>
    </div>
  );
}

export default App;
