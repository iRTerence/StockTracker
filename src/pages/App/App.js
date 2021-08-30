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
  let [watchList, setWatchList] = useState([]);

  //This is using context where I am checking if there is a User logged in for authorization and authentication
  const userObject = useContext(myContext);
  //This is to set if the user is logged in or logged out in the state. I use this so that useeffect can be updated per loggedin user
  useEffect(() => {
    if (userObject) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });
  //sets the state of the watchlist from the Usercontext which gets the user item
  useEffect(() => {
    if (userObject) {
      let watchArr = [];
      userObject.watch.map((ticker) => watchArr.push(ticker));
      console.log(watchArr);
      setWatchList((watchList) => [...watchList, ...watchArr]);
    }
  }, [loggedIn]);

  //sets the state of the portfoliolist from the Usercontext which gets the user item
  useEffect(() => {
    if (userObject) {
      let portArr = [];
      userObject.portfolio.map((ticker) => portArr.push(ticker));
      setPortList((portList) => [...portList, ...portArr]);
    }
  }, [loggedIn]);

  //Function to add to portfolio list state
  let addPortList = (newPort) => {
    setPortList((portList) => [...portList, newPort]);
  };

  //Function to add to watch list state
  let addWatchList = (newWatch) => {
    setWatchList((watchList) => [...watchList, newWatch]);
  };

  let deleteWItem = async (id) => {
    axios
      .delete(`api/stocks/delwatch/${id}`)
      .then((res) => console.log(res.data));
  };

  return (
    <div className='App'>
      <NavBar />

      <Switch>
        <Route
          path='/'
          exact
          render={({ history }) => (
            <HomePage
              history={history}
              watchList={watchList}
              portList={portList}
              deleteWItem={deleteWItem}
            />
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
