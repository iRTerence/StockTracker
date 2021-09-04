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
  let [baseInvestment, setBaseInvestment] = useState(0);
  let [currentInvestment, setCurrentInvestment] = useState(0);
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
  //sets the state of the watch list, portfolio list, and base investment from the Usercontext which is the logged in user
  useEffect(() => {
    if (userObject) {
      let watchArr = [];
      let portArr = [];
      let portfolio = userObject.portfolio;

      //set baseInvesetment (initial investment) from the user
      for (let i = 0; i < portfolio.length; i++) {
        baseInvestment =
          portfolio[i].holdings * portfolio[i].average + baseInvestment;
      }
      setBaseInvestment(baseInvestment);

      //sets portfolio list
      userObject.portfolio.map((ticker) => portArr.push(ticker));
      setPortList((portList) => [...portList, ...portArr]);
      //sets watch list
      userObject.watch.map((ticker) => watchArr.push(ticker));
      setWatchList((watchList) => [...watchList, ...watchArr]);
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

  //function to delete watchlist items and to make a call to the backend
  let deleteWItem = (id) => {
    axios
      .delete(`api/stocks/delwatch/${id}`)
      .then((res) => setWatchList(res.data.watch));
  };
  //function to delete portfolio items and to make a call to the backend
  let deletePItem = (id) => {
    axios
      .delete(`api/stocks/delportfolio/${id}`)
      .then((res) => setPortList(res.data.portfolio));
  };

  //function to edit the portfolio
  let editPortoflioStock = (id, newAverage, newHoldings) => {
    let updatedStock = portList.map((stock) =>
      stock._id === id
        ? { ...stock, average: newAverage, holdings: newHoldings }
        : stock
    );
    setPortList(updatedStock);
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
              deletePItem={deletePItem}
              edit={editPortoflioStock}
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
