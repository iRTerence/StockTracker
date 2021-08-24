import "./App.css";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import HomePage from "../Homepage/Homepage";
import LoginPage from "../LoginPage/LoginPage";
import NavBar from "../../components/NavBar/NavBar";
import SearchPage from "../SearchPage/SearchPage";
import { myContext } from "../../contexts/UserContext";
import axios from "axios";

function App() {
  let [value, setValue] = useState(0);
  let [portList, setPortList] = useState([]);
  let [watchList, setWatchList] = useState(["fight dog", "fight cat"]);

  //This is using context where I am checking if there is a User logged in for authorization and authentication
  const userObject = useContext(myContext);

  let addPortList = (newPort) => {
    setPortList((portList) => [...portList, newPort]);
  };

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => (
            <HomePage history={history} list={watchList} />
          )}
        />
        {userObject ? null : (
          <Route
            path='/login'
            exact
            render={({ history }) => <LoginPage history={history} />}
          />
        )}
        <Route
          path='/search'
          exact
          render={({ history }) => (
            <SearchPage history={history} addPort={addPortList} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
