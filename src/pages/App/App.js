import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import HomePage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import { myContext } from "../../contexts/UserContext";

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);
  let [value, setValue] = useState(0);
  let [watchList, setWatchList] = useState([]);
  let [portList, setPortList] = useState([]);

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => <HomePage history={history} />}
        />
        <Route
          path='/login'
          exact
          render={({ history }) => <LoginPage history={history} />}
        />
      </Switch>
    </div>
  );
}

export default App;
