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
  let [loggedIn, setLoggedIn] = useState(false);
  let [portList, setPortList] = useState([]);
  let [watchList, setWatchList] = useState(["fight dog", "fight cat"]);

  //This is using context where I am checking if there is a User logged in for authorization and authentication
  const userObject = useContext(myContext);

  useEffect(() => {
    if (userObject) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  useEffect(() => {
    if (userObject) {
      let emptyArr = [];
      userObject.watch.map((ticker) => emptyArr.push(ticker.ticker));
      console.log(emptyArr);
      setWatchList((watchList) => [...watchList, ...emptyArr]);
    }
  }, [loggedIn]);

  let addPortList = (newPort) => {
    setPortList((portList) => [...portList, newPort]);
  };

  let addWatchList = (newWatch) => {
    setWatchList((watchList) => [...watchList, newWatch]);
  };

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => (
            <HomePage history={history} watchList={watchList} />
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
            <SearchPage
              history={history}
              addPort={addPortList}
              addWatch={addWatchList}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
